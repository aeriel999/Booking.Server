﻿using Booking.Api.Contracts.Post.CreatePost;
using Booking.Api.Contracts.Post.GetCategories;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Contracts.Post.GetCountries;
using Booking.Api.Contracts.Post.GetStreets;
using Booking.Api.Contracts.Post.GetTypeOfPost;
using Booking.Api.Infrastructure;
using Booking.Application.Posts.CreatePost;
using Booking.Application.Posts.GetCategoriesList;
using Booking.Application.Posts.GetCities;
using Booking.Application.Posts.GetCountries;
using Booking.Application.Posts.GetStreets;
using Booking.Application.Posts.GetTypeOfRent;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class PostController(ISender mediatr, IMapper mapper) : ApiController
{
	[HttpPost("create-post")]
	public async Task<IActionResult> CreatePostAsync(CreatePostRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var images = new List<byte[]>();

		if (request.Images != null && request.Images.Count != 0)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				foreach (var image in request.Images)
				{
					await image.CopyToAsync(memoryStream);

					images.Add(memoryStream.ToArray());
				}
			}
		}

		var createPostResult = await mediatr.Send(mapper.Map<CreatePostCommand>(
			(request, Guid.Parse(userId), images)));

		return createPostResult.Match(
			createPostResult => Ok(createPostResult),
			errors => Problem(errors));
	}

	[HttpGet("get-type-of-rent-list")]
	public async Task<IActionResult> GetTypeOfRentListAsync()
	{
		var getTypeOfPostListResult = await mediatr.Send(new GetTypeOfRentListQuery());

		return getTypeOfPostListResult.Match(
			getTypeOfPostListResult => Ok(mapper.Map<List<GetTypeOfPostResponse>>(getTypeOfPostListResult)),
			errors => Problem(errors));
	}

	[HttpGet("get-categories-list")]
	public async Task<IActionResult> GetCategoriesListAsync()
	{
		var getCategoriesListResult = await mediatr.Send(new GetCategoriesListQuery());

		return getCategoriesListResult.Match(
			getCategoriesListResult => Ok(mapper.Map<List<GetCategoryResponse>>(getCategoriesListResult)),
			errors => Problem(errors));
	}

	[HttpGet("get-countries-list")]
	public async Task<IActionResult> GetCountriesListAsync()
	{
		var getCountriesListResult = await mediatr.Send(new GetCountriesListQuery());

		return getCountriesListResult.Match(
			getCountriesListResult => Ok(mapper.Map <List<GetCountryResponse>> (getCountriesListResult)),
			errors => Problem(errors));
	}

	[HttpGet("get-cities-list")]
	public async Task<IActionResult> GetCitiesListByCountryIdAsync(
		[FromQuery]GetCitiesListByCountryIdRequest request)
	{
		var getCitiesListResult = await mediatr.Send(mapper.Map<GetCitiesListByCountryIdQuery>(request));

		var response = getCitiesListResult == null ? null 
			: mapper.Map<List<GetCityResponse>>(getCitiesListResult);

		return Ok(response);
	}

	[HttpGet("get-street-list")]
	public async Task<IActionResult> GetStreetsListByCityIdAsync(
		[FromQuery] GetStreetsListByCityIdRequest request)
	{
		var getStreetsListResult = await mediatr.Send(mapper.Map<GetStreetsListByCityIdQuery>(request));

		var response = getStreetsListResult == null ? null
			: mapper.Map<List<GetStreetResponse>>(getStreetsListResult);

		return Ok(response);
	}
}
