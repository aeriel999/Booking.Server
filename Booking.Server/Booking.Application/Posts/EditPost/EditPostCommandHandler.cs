using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.EditPost;

public class EditPostCommandHandler(
	IPostRepository postRepository,
	IPostTypeOfRentRepository postTypeOfRentRepository,
	IPostCategoryRepository postCategoryRepository,
	IPostCityRepository postCityRepository,
	IPostStreetRepository postStreetRepository,
	IImageStorageService imageStorageService,
	IPostImageRepository postImageRepository) 
	: IRequestHandler<EditPostCommand, ErrorOr<Post>>
{
	public async Task<ErrorOr<Post>> Handle(EditPostCommand request, CancellationToken cancellationToken)
	{
		//Get Post
		var post = await postRepository.GetPostByIdAsync(request.Id);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Check for Realtor Id matching
		if (post.UserId != request.UserId)
			return Error.Validation("Access deny");

		//Update fields
		if (request.Name != post.Name)
		{
			post.Name = request.Name;
		}

		if (request.PostTypeOfRentId != null && request.PostTypeOfRentId != post.PostTypeOfRentId)
		{
			// Check typeOfRent for existing
			var typeOfRent = await postTypeOfRentRepository.GetTypeOfRentByIdAsync((Guid)request.PostTypeOfRentId);

			if (typeOfRent == null)
				return Error.NotFound("Type of rent is not found");

			post.PostTypeOfRentId = (Guid)request.PostTypeOfRentId;
		}

		if (request.CategoryId != null && request.CategoryId != post.CategoryId)
		{
			//Check category for existing
			var category = await postCategoryRepository.FindPostCategoryByIdAsync((Guid)request.CategoryId);

			if (category == null)
				return Error.NotFound("Category is not found");

			post.CategoryId = (Guid)request.CategoryId;
		}

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

		if (request.BuildingNumber != post.BuildingNumber)
		{
			post.BuildingNumber = request.BuildingNumber;
		}

		if ( request.NumberOfRooms != null &&request.BuildingNumber != post.BuildingNumber)
		{
			post.NumberOfRooms = request.NumberOfRooms;
		}

		if (request.Area != null && request.Area != post.Area)
		{
			post.Area = request.Area;
		}

		if (request.Price != post.Price)
		{
			post.Price = request.Price;
		}

		if (request.Description != null &&  request.Description != post.Description)
		{
			post.Description = request.Description;
		}

		post.IsActive = false;

		await postRepository.UpdatePostAsync(post);

		await postRepository.SavePostAsync();

		//Save new images
		if (request.Images != null && request.Images.Count != 0)
		{
			int priority = 1;

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

		//Delete images
		if (request.DeleteImages != null && request.DeleteImages.Count != 0)
		{
			foreach (var image in request.DeleteImages)
			{
				await imageStorageService.DeleteImageAsync(image, "posts");

				await postImageRepository.DeletePostImageByNameAsync(image);
			}
		}

		return post;
	}
}
