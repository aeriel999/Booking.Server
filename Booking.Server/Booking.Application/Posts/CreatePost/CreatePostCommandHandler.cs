using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.CreatePost;

public class CreatePostCommandHandler(
	IPostRepository postRepository, 
	IImageStorageService imageStorageService,
	IPostImageRepository postImageRepository,
	IPostCategoryRepository postCategoryRepository,
	IPostStreetRepository streetRepository,
	IPostTypeOfRentRepository postTypeOfRentRepository,
	IPostCountryRepository postCountryRepository,
	IPostCityRepository postCityRepository)
	: IRequestHandler<CreatePostCommand, ErrorOr<Post>>
{
	public async Task<ErrorOr<Post>> Handle(
		CreatePostCommand request, CancellationToken cancellationToken)
	{
		//Check typeOfRent for existing
		var typeOfRent = await postTypeOfRentRepository.GetTypeOfRentByIdAsync(request.PostTypeOfRentId);

		if (typeOfRent == null)
			return Error.NotFound("Type of rent is not found");

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
					Name = request.CityName,
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
					Name = request.StreetName,
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

		//Create and save new post
		var post = new Post
		{
			UserId = request.UserId,
			Name = request.Name,
			CategoryId = request.CategoryId,
			Description = request.Description,
			PostTypeOfRentId = request.PostTypeOfRentId,
			StreetId = street.Id,
			BuildingNumber = request.BuildingNumber,
			NumberOfRooms = request.NumberOfRooms,
			Area = request.Area,
			Price = request.Price,
			PostAt = DateTime.Now.ToUniversalTime(),
		};

		await postRepository.CreatePostAsync(post);

		await postRepository.SavePostAsync();

		//Save image in local storage and create and save image in DB
		if (request.Images.Count > 0 && request.Images != null)
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

		return post;
	}
}
