using Booking.Api.Contracts.Post.CreatePost;
using Booking.Api.Contracts.Post.GetCategories;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Contracts.Post.GetCountries;
using Booking.Api.Contracts.Post.GetListOfPost;
using Booking.Api.Contracts.Post.GetPost;
using Booking.Api.Contracts.Post.GetStreets;
using Booking.Api.Contracts.Post.GetTypeOfPost;
using Booking.Application.Common.Behaviors;
using Booking.Application.Posts.CreatePost;
using Booking.Application.Posts.GetCities;
using Booking.Application.Posts.GetStreets;
using Booking.Domain.Posts;
using Mapster;
using System.Linq;

namespace Booking.Api.Common.Mapping;

public class PostMapping : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<(
			CreatePostRequest createPostRequest, Guid UserId, List<byte[]> Images), CreatePostCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest.Images, src => src.Images)
		.Map(dest => dest, src => src.createPostRequest);

		config.NewConfig<Post, GetPostResponse>()
			.Map(desp => desp.Category, src => src.Category.Name)
			.Map(desp => desp.PostTypeOfRent, src => src.PostTypeOfRent.Name)
            .Map(desp => desp.Country, src => src.Street.City.Country.Name)
            .Map(desp => desp.City, src => src.Street.City.Name)
            .Map(desp => desp.Street, src => src.Street.Name)
			.Map(desp => desp.User, src => $"{src.User.FirstName} {src.User.LastName}")
			.Map(desp => desp.ImagePost, src => src.ImagesPost.FirstOrDefault(img => img.Priority == 1).Name)
			.Map(desp => desp.ChatRoomsId, src => src.ChatRooms.Select(x=>x.ChatRoomId).ToList());

        config.NewConfig<Post, GetListOfPostResponse>()
            .Map(desp => desp.Category, src => src.Category.Name)
            .Map(desp => desp.User, src => $"{src.User.FirstName} {src.User.LastName}")
            .Map(desp => desp.ImagePost, src => src.ImagesPost.FirstOrDefault(img => img.Priority == 1).Name);

        config.NewConfig<PagedList<GetListOfPostResponse>, PagedList<Post>>()
			.Map(desp => desp.items, src => src.items.Adapt<List<GetListOfPostResponse>>());


        config.NewConfig<PostCategory, GetCategoryResponse>();
		config.NewConfig<List<PostCategory>, List<GetCategoryResponse>>();

		config.NewConfig<PostCountry, GetCountryResponse>();
		config.NewConfig<List<PostCountry>, List<GetCountryResponse>>();

		config.NewConfig<GetCitiesListByCountryIdRequest, GetCitiesListByCountryIdQuery>()
			.Map(dest => dest.ContryId, src => src.CountryId);

		config.NewConfig<PostCity, GetCityResponse>();
		config.NewConfig<List<PostCity>, List<GetCityResponse>>();

		config.NewConfig<GetStreetsListByCityIdRequest, GetStreetsListByCityIdQuery>()
			.Map(dest => dest.CityId, src => src.CityId);

		config.NewConfig<PostStreet, GetStreetResponse>();
		config.NewConfig<List<PostStreet>, List<GetStreetResponse>>();

		config.NewConfig<PostTypeOfRent, GetTypeOfPostResponse>();
		config.NewConfig<List<PostTypeOfRent>, List<GetTypeOfPostResponse>>();
	}
}
