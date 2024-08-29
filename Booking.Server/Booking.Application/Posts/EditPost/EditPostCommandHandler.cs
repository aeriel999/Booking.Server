using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;
using static System.Net.Mime.MediaTypeNames;

namespace Booking.Application.Posts.EditPost;

public class EditPostCommandHandler(
	IPostRepository postRepository,
	IPostCategoryRepository postCategoryRepository,
	IPostCityRepository postCityRepository,
	IPostStreetRepository postStreetRepository,
	IImageStorageService imageStorageService,
	IPostImageRepository postImageRepository,
	IUserRepository userRepository,
	IPostPostTypeOfRestRepository typeOfRestRepository,
	IPostServiceRepository postServiceRepository) 
	: IRequestHandler<EditPostCommand, ErrorOr<Post>>
{
	public async Task<ErrorOr<Post>> Handle(EditPostCommand request, CancellationToken cancellationToken)
	{
		//Get Post
		var post = await postRepository.GetPostByIdAsync(request.Id);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Get user
		var userOrError = await userRepository.GetUserByIdAsync(request.UserId);

		if (userOrError.IsError)
			return Error.NotFound("User is not found");

		var user = userOrError.Value;

		//Check for Realtor Id matching
		if (post.UserId != request.UserId)
			return Error.Validation("Access deny");

	//Update fields
		if (request.Name != post.Name)
		{
			post.Name = request.Name;
		}

		//Category
		if (request.CategoryId != post.CategoryId)
		{
			//Check category for existing
			var category = await postCategoryRepository.FindPostCategoryByIdAsync((Guid)request.CategoryId!);

			if (category == null)
				return Error.NotFound("Category is not found");

			post.CategoryId = (Guid)request.CategoryId;
		}

	//Adress
		//Street
		if (request.StreetId == null || request.StreetId != post.StreetId)
		{
			Guid cityId = request.CityId ?? Guid.Empty;

			//Create new city
			if (request.CityId == null && request.CityName != null)
			{
				var city = await postCityRepository.FindCityByNameAndCountryIdAsync(
					request.CityName, (Guid)request.CountryId!);
				
				if (city == null)
				{
					city = new PostCity
					{
						Name = request.CityName,
						CountryId = (Guid)request.CountryId,
					};

					await postCityRepository.CreateCityAsync(city);
					await postCityRepository.SaveCityAsync();
				}

				cityId = city.Id;
			}

			//Create new street
			if (request.StreetId == null && request.StreetName != null)
			{
				var street = await postStreetRepository.FindStreetByNameAndCityIdAsync(
					request.StreetName, cityId);

				if (street == null)
				{
					street = new PostStreet
					{
						Name = request.StreetName,
						CityId = cityId,
					};

					await postStreetRepository.CreateStreetAsync(street);
					await postStreetRepository.SaveStreetAsync();
				}

				post.StreetId = street.Id;
			}
			else if(request.StreetId != null)
			{
				post.StreetId = (Guid)request.StreetId;
			}
		}

		//ZipCode
		if (request.ZipCode != post.ZipCode)
		{
			post.ZipCode = request.ZipCode;
		}

		//NumberOfGuests
		if ( request.NumberOfGuests != null &&request.NumberOfGuests != post.NumberOfGuests)
		{
			post.NumberOfGuests = request.NumberOfGuests;
		}

		//Price
		if (request.Price != post.Price)
		{
			post.Price = request.Price;
		}

		post.IsActive = user.Rating >= 4.5 ? true : false;

		post.EditAt = DateTime.Now.ToUniversalTime();

		await postRepository.UpdatePostAsync(post);

		await postRepository.SavePostAsync();

		//Change main image
		if (request.MainImage != null)
		{
			var mainImage = await imageStorageService.SavePostImageInStorageAsync(request.MainImage);

			if (mainImage == null)
				return Error.Validation("Image not save");

			var postImage = new PostImage
			{
				Name = mainImage,
				Priority = 1,
				PostId = post.Id
			};

			await postImageRepository.CraetePostImageAsync(postImage);
		}

		//Delete images 
		if (request.DeleteImages != null && request.DeleteImages.Count != 0)
		{
			var imageListForDelete = new List<PostImage>();

			foreach (var image in request.DeleteImages)
			{
				var getPostImage = postImageRepository.GetImageByName(image.Name);

				if (getPostImage.IsError)
					return Error.NotFound("Image not found");

				imageListForDelete.Add(getPostImage.Value);

				imageStorageService.DeleteImage(image.Name, "posts");
			}

			await postImageRepository.DeletePostImageListByNameAsync(imageListForDelete);
		}

		//Upload new images 
		if (request.Images != null && request.Images.Count != 0)
		{
			var index = 0;

			var imagListLength = await postRepository.GetCountOfImagesByPostIdAsync(post.Id);

			foreach (var image in request.Images)
			{
				var priority = ((request.DeleteImages != null && request.DeleteImages.Count != 0) 
					&& request.DeleteImages.Count > index) ? 
					request.DeleteImages[index].Index 
					: (imagListLength + 1 + index);

				index++;

				var imageName = await imageStorageService
						.SavePostImageInStorageAsync(image);

				if (imageName == null)
					return Error.Validation("Image not save");

				var postImage = new PostImage
				{
					Name = imageName,
					Priority = priority,
					PostId = post.Id
				};

				await postImageRepository.CraetePostImageAsync(postImage);
			}
		}

		//Add Types of Rest
		if (request.PostTypesOfRest != null && request.PostTypesOfRest.Count > 0)
		{
			var postList = new List<PostPostTypeOfRest>();

			foreach (var type in request.PostTypesOfRest)
			{
				var postTypeOfRent = new PostPostTypeOfRest
				{
					PostId = post.Id,
					PostTypeOfRestId = type
				};

				postList.Add(postTypeOfRent);
			}

			await typeOfRestRepository.CreatePostPostTypeOfRestListAsync(postList);

		}

		//Delete Types of Rest
		if (request.DeletedPostTypesOfRest != null && request.DeletedPostTypesOfRest.Count > 0)
		{
			var deletedTypesList = new List<PostPostTypeOfRest>();

			foreach (var item in request.DeletedPostTypesOfRest)
			{
				var resultOfGetType = typeOfRestRepository.GetPostTypeOfRestById(Guid.Parse(item), post.Id);

				if (resultOfGetType.IsError) return Error.NotFound("Type of rest is not found");

				deletedTypesList.Add(resultOfGetType.Value);
			}

			await typeOfRestRepository.DeletePostPostTypeOfRestListAsync(deletedTypesList);
		}


		//Add services
		if (request.Services != null && request.Services.Count > 0)
		{
			var services = new List<PostService>();

			foreach (var service in request.Services)
			{
				var postService = new PostService
				{
					PostId = post.Id,
					ServiceId = service
				};

				services.Add(postService);
			}

			await postServiceRepository.CreatePostServiceListAsync(services);
		}

		//Delete servises
		if (request.DeletedServices != null && request.DeletedServices.Count > 0)
		{
			var deleteServices = new List<PostService>();

			foreach (var service in request.DeletedServices)
			{
				var postServiceResult = postServiceRepository.GetPostServiceById(Guid.Parse(service), post.Id);

				if (postServiceResult.IsError) return Error.NotFound("Type of rest is not found");

				deleteServices.Add(postServiceResult.Value);
			}

			await postServiceRepository.CreatePostServiceListAsync(deleteServices);
		}
		
		return post;
	}
}
