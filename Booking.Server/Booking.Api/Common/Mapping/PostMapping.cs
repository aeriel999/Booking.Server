﻿using Booking.Api.Contracts.Post.CreatePost;
using Booking.Api.Contracts.Post.GetArchivedPostListForRealtor;
using Booking.Api.Contracts.Post.GetCategories;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Contracts.Post.GetCountries;
using Booking.Api.Contracts.Post.GetFilteredList;
using Booking.Api.Contracts.Post.GetListOfPost;
using Booking.Api.Contracts.Post.GetPost;
using Booking.Api.Contracts.Post.GetPostForEditing;
using Booking.Api.Contracts.Post.GetPostListForRealtor;
using Booking.Api.Contracts.Post.GetStreets;
using Booking.Api.Contracts.Post.GetTypeOfPost;
using Booking.Application.Common.Behaviors;
using Booking.Application.Posts.CreatePost;
using Booking.Application.Posts.EditPost;
using Booking.Application.Posts.GetCities;
using Booking.Application.Posts.GetFilteredList;
using Booking.Application.Posts.GetNameOfPost;
using Booking.Application.Posts.GetPostByName;
using Booking.Application.Posts.GetPostListForRealtor;
using Booking.Application.Posts.GetStreets;
using Booking.Domain.Posts;
using Mapster;
using Microsoft.Extensions.Hosting;

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
			.Map(desp => desp.Category, src => src.Category!.Name)
			.Map(desp => desp.PostTypeOfRent, src => src.PostTypeOfRent!.Name)
			.Map(desp => desp.Street, src => src.Street!.Name)
			.Map(desp => desp.User, src => $"{src.User!.FirstName} {src.User.LastName}")
			.Map(desp => desp.CountryName, src => src.Street!.City!.Country!.Name)
			.Map(desp => desp.CountryId, src => src.Street!.City!.CountryId)
			.Map(desp => desp.CityName, src => src.Street!.City!.Name)
			.Map(desp => desp.CityId, src => src.Street!.City!.Id)
			.Map(desp => desp.ImagePostList, src =>
			 src.ImagesPost != null ? src.ImagesPost.OrderBy(img => img.Priority)
			 .Select(img => img.Name).ToArray() : Array.Empty<string>());

		config.NewConfig<Post, GetListOfPostResponse>()
            .Map(desp => desp.Category, src => src.Category!.Name)
            .Map(desp => desp.User, src => $"{src.User!.FirstName} {src.User.LastName}")
            .Map(desp => desp.ImagePost, src => src.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name);

        config.NewConfig<PagedList<GetListOfPostResponse>, PagedList<Post>>()
			.Map(desp => desp.items, src => src.items.Adapt<List<GetListOfPostResponse>>());

        config.NewConfig<(GetFilteredListRequest request, string name), GetNameOfPostQuery>()
            .Map(dest => dest.category, src => src.request.category)
            .Map(dest => dest.country, src => src.request.country)
            .Map(dest => dest.city, src => src.request.city)
            .Map(dest => dest.realtor, src => src.request.realtor)
            .Map(dest => dest.name, src => src.name);

        config.NewConfig<(GetFilteredListRequest request, int page, int sizeOfPage), GetFilteredListQuery>()
			.Map(dest => dest.category, src => src.request.category)
			.Map(dest => dest.country, src => src.request.country)
			.Map(dest => dest.city, src => src.request.city)
			.Map(dest => dest.realtor, src => src.request.realtor)
			.Map(dest => dest.page, src => src.page)
            .Map(dest => dest.sizeOfPage, src => src.sizeOfPage);

        config.NewConfig<(GetFilteredListRequest request,string name, int page, int sizeOfPage),
			GetPostByNameQuery>()
            .Map(dest => dest.category, src => src.request.category)
            .Map(dest => dest.country, src => src.request.country)
            .Map(dest => dest.city, src => src.request.city)
            .Map(dest => dest.realtor, src => src.request.realtor)
            .Map(dest => dest.name, src => src.name)
            .Map(dest => dest.page, src => src.page)
            .Map(dest => dest.sizeOfPage, src => src.sizeOfPage);

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

		config.NewConfig<GetPostListForRealtorQueryResult, GetPostListForRealtorResponse>();
		config.NewConfig<PagedList<GetPostListForRealtorQueryResult>, PagedList<GetPostListForRealtorResponse>>();


		config.NewConfig<Post, GetPostForEditResponse>()
			.Map(desp => desp.Category, src => src.Category!.Name)
			.Map(desp => desp.PostTypeOfRent, src => src.PostTypeOfRent!.Name)
			.Map(desp => desp.Street, src => src.Street!.Name)
			.Map(desp => desp.User, src => $"{src.User!.FirstName} {src.User.LastName}")
			.Map(desp => desp.CountryName, src => src.Street!.City!.Country!.Name)
			.Map(desp => desp.CountryId, src => src.Street!.City!.CountryId)
			.Map(desp => desp.CityName, src => src.Street!.City!.Name)
			.Map(desp => desp.CityId, src => src.Street!.City!.Id)
			.Map(desp => desp.ImagePostList, src =>
			src.ImagesPost != null ? src.ImagesPost.Select(img => img.Name).ToArray() : Array.Empty<string>());
	
		config.NewConfig<(
			EditPostRequest editPostRequest, Guid UserId, List<byte[]> Images), EditPostCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest.Images, src => src.Images)
		.Map(dest => dest, src => src.editPostRequest);

		config.NewConfig<Post, GetArchivedPostListForRealtorResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Category, src => src.Category!.Name)
			.Map(desp => desp.TypeOfRent, src => src.PostTypeOfRent!.Name)
			.Map(desp => desp.Adress,
			src => src.Street!.City!.Country!.Name + " " + src.Street.City.Name + " " + src.Street.Name)
			.Map(desp => desp.Name, src => src.Name)
			.Map(desp => desp.Price, src => src.Price)
			.Map(desp => desp.DateOfPost, src => src.PostAt)
			.Map(desp => desp.DateOfEdit, src => src.EditAt)
			.Map(desp => desp.IsActive, src => src.IsActive);

		config.NewConfig<PagedList<Post>, PagedList<GetArchivedPostListForRealtorResponse>>();
	}
}
