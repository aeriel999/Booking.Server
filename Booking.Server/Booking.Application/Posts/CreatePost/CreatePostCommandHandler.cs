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
	IStreetRepository streetRepository,
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

		//Add new city if it not exist
		if (request.CityId == null && request.CityName != null)
		{
			var city = await postCityRepository.FindCityByNameAndCountryIdAsync(
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

		//Check street for existing
		var street = await streetRepository.GetStreetByIdAsync(request.StreetId);

		if (street == null)
			return Error.NotFound("Street is not found");



		//Create and save new post
		var post = new Post
		{
			UserId = request.UserId,
			Name = request.Name,
			CategoryId = request.CategoryId,
			Description = request.Description,
			PostTypeOfRentId = request.PostTypeOfRentId,
			StreetId = request.StreetId,
			BuildingNumber = request.BuildingNumber,
			NumberOfRooms = request.NumberOfRooms,
			Area = request.Area,
			Price = request.Price,
			DateOfPlacement = DateTime.Now
		};

		await postRepository.CreatePostAsync(post);

		await postRepository.SavePostAsync();

		//Save image in lokalestorage and create and save image in DB
		if (request.Images.Count > 0 && request.Images != null)
		{
			int priority = 1;

			foreach (var image in request.Images)
			{
				var imageName = await imageStorageService.SavePostImageAsync(image);

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
