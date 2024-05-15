using Booking.Api.Contracts.Post.CreatePost;
using Booking.Api.Contracts.Post.GetCategories;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Contracts.Post.GetCountries;
using Booking.Api.Contracts.Post.GetStreets;
using Booking.Api.Contracts.Post.GetTypeOfPost;
using Booking.Application.Posts.CreatePost;
using Booking.Application.Posts.GetCities;
using Booking.Application.Posts.GetStreets;
using Booking.Domain.Posts;
using Mapster;

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
