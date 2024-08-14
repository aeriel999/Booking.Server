using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;
using static System.Net.Mime.MediaTypeNames;

namespace Booking.Application.Posts.CreatePost;

public class CreatePostCommandHandler(
	IPostRepository postRepository, 
	IImageStorageService imageStorageService,
	IPostImageRepository postImageRepository,
	IPostCategoryRepository postCategoryRepository,
	IPostStreetRepository streetRepository,
	IPostCountryRepository postCountryRepository,
	IPostCityRepository postCityRepository,
	IUserRepository userRepository,
	IPostPostTypeOfRestRepository postPostTypeOfRestRepository,
	IPostServiceRepository postServiceRepository)
	: IRequestHandler<CreatePostCommand, ErrorOr<Post>>
{
	public async Task<ErrorOr<Post>> Handle(
		CreatePostCommand request, CancellationToken cancellationToken)
	{
		//Get user
		var userOrError = await userRepository.FindByIdAsync(request.UserId);

		if(userOrError.IsError)
			return Error.NotFound("User is not found");

		var user = userOrError.Value;

		//Check category for existing
		var category = await postCategoryRepository.FindPostCategoryByIdAsync(request.CategoryId);

		if (category == null)
			return Error.NotFound("Category is not found");

		//Check country for existing 

		var country = await postCountryRepository.GetPostCountryByIdAsync(request.CountryId);

		if(country == null)
			return Error.NotFound("Country is not found");

		//City
		PostCity? city = null;

		//Add new city if it not exist
		if (request.CityId == null && request.CityName != null)
		{
			city = await postCityRepository.FindCityByNameAndCountryIdAsync(
				request.CityName, request.CountryId);

			if (city == null)
			{
				city = new PostCity
				{
					Name = request.CityName.Trim(),
					CountryId = request.CountryId,
				};

				await postCityRepository.CreateCityAsync(city);
				await postCityRepository.SaveCityAsync();
			}
		}
		else  
		{
			//Check city for existing
			city = await postCityRepository.GetCityByIdAsync(request.CityId);

			if (city == null)
				return Error.NotFound("City is not found");
		}

		//Street
		PostStreet? street = null;

		if (request.StreetId == null && request.StreetName != null)
		{
			street = await streetRepository.FindStreetByNameAndCityIdAsync(
				request.StreetName, city.Id);

			if (street == null)
			{
				street = new PostStreet
				{
					Name = request.StreetName.Trim(),
					CityId = city.Id,
				};

				await streetRepository.CreateStreetAsync(street);
				await streetRepository.SaveStreetAsync();
			}
		}
		else 
		{
			//Check street for existing
			street = await streetRepository.GetStreetByIdAsync(request.StreetId);

			if (street == null)
				return Error.NotFound("Street is not found");
		}


		//CreatePostPostTypeOfRestAsync and save new post
		var post = new Post
		{
			UserId = request.UserId,
			Name = request.Name,
			CategoryId = request.CategoryId,
			StreetId = street.Id,
			ZipCode = request.ZipCode,
			NumberOfGuests = request.NumberOfGuests,
			Price = request.Price,
			Discount = request.Discount,
			Rate = 0,
			IsActive = user.Rating >= 4.5 ? true : false,
			IsArhive = false,
			PostAt = DateTime.Now.ToUniversalTime(),
		};

		await postRepository.CreatePostAsync(post);

		await postRepository.SavePostAsync();


		//Add Types of Rest
		if (request.PostTypesOfRest != null)
		{
			foreach (var type in request.PostTypesOfRest)
			{
				var postTypeOfRent = new PostPostTypeOfRest
				{
					PostId = post.Id,
					PostTypeOfRestId = type
				};

				await postPostTypeOfRestRepository.CreatePostPostTypeOfRestAsync(postTypeOfRent);
			}
		}

		//Add services
		if (request.PostServices != null)
		{
			foreach (var service in request.PostServices)
			{
				var postService = new PostService
				{
					PostId = post.Id,
					ServiceId = service
				};

				await postServiceRepository.CreatePostServiceAsync(postService);
			}
		}

		//Save image in local storage and create and save image in DB
		if ( request.MainImage != null)
		{
			var imageName = await imageStorageService.SavePostImageInStorageAsync(request.MainImage);

			if (imageName == null)
				return Error.Validation("Image not save");

			var postImage = new PostImage
			{
				Name = imageName,
				Priority = 1,
				PostId = post.Id
			};

			await postImageRepository.CraetePostImageAsync(postImage);
			await postImageRepository.SavePostImageAsync();
		}


		if (request.Images.Count > 0 && request.Images != null)
		{
			int priority = 2;

			foreach (var image in request.Images)
			{
				var imageName = await imageStorageService.SavePostImageInStorageAsync(image);

				if (imageName == null)
					return Error.Validation("Image not save");

				var postImage = new PostImage
				{
					Name = imageName,
					Priority = priority++,
					PostId = post.Id
				};

				await postImageRepository.CraetePostImageAsync(postImage);
				await postImageRepository.SavePostImageAsync();
			}
		}

		return post;
	}
}
