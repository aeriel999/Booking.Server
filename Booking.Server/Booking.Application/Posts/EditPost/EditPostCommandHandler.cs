using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.EditPost;

public class EditPostCommandHandler(
	IPostRepository postRepository,
	IPostCategoryRepository postCategoryRepository,
	IPostCityRepository postCityRepository,
	IPostStreetRepository postStreetRepository,
	IImageStorageService imageStorageService,
	IPostImageRepository postImageRepository,
	IUserRepository userRepository) 
	: IRequestHandler<EditPostCommand, ErrorOr<Post>>
{
	public async Task<ErrorOr<Post>> Handle(EditPostCommand request, CancellationToken cancellationToken)
	{
		//Get Post
		var post = await postRepository.GetPostWithIncludesByIdAsync(request.Id);

		if (post == null)
			return Error.NotFound("Post was not found");

		//Get user
		var userOrError = await userRepository.GetUserAsync(request.UserId.ToString());

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

		if (request.ZipCode != post.ZipCode)
		{
			post.ZipCode = request.ZipCode;
		}

		if ( request.NumberOfGuests != null &&request.NumberOfGuests != post.NumberOfGuests)
		{
			post.NumberOfGuests = request.NumberOfGuests;
		}
 
		if (request.Price != post.Price)
		{
			post.Price = request.Price;
		}

		//if (request.Description != null &&  request.Description != post.Description)
		//{
		//	post.Description = request.Description;
		//}

		post.IsActive = user.Rating >= 4.5 ? true : false;

		post.EditAt = DateTime.Now.ToUniversalTime();

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
