using Booking.Api.Contracts.Post.CreatePost;
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
using Booking.Api.Infrastructure;
using Booking.Application.Common.Behaviors;
using Booking.Application.Posts.ArchivePost;
using Booking.Application.Posts.CreatePost;
using Booking.Application.Posts.EditPost;
using Booking.Application.Posts.GetCategoriesList;
using Booking.Application.Posts.GetCities;
using Booking.Application.Posts.GetCountries;
using Booking.Application.Posts.GetFilteredList;
using Booking.Application.Posts.GetListOfPost;
using Booking.Application.Posts.GetNameOfPost;
using Booking.Application.Posts.GetPostById;
using Booking.Application.Posts.GetPostByName;
using Booking.Application.Posts.GetPostListForRealtor;
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
			foreach (var image in request.Images)
			{
				using MemoryStream memoryStream = new();
				await image.CopyToAsync(memoryStream);
				images.Add(memoryStream.ToArray());
			}
		}

		var createPostResult = await mediatr.Send(mapper.Map<CreatePostCommand>(
			(request, Guid.Parse(userId), images)));

		return createPostResult.Match(
			createPostResult => Ok(createPostResult),
			errors => Problem(errors));
	}

	[AllowAnonymous]
	[HttpGet("get-list-of-post")]
    public async Task<IActionResult> GetListOfPostAsync([FromQuery]int page, int sizeOfPage)
    {
        var getlistOfPostResult = await mediatr.Send(new GetListOfPostQuery(page,sizeOfPage));

        return getlistOfPostResult.Match(
            getlistOfPostResult => Ok(mapper.Map<PagedList<GetListOfPostResponse>>(getlistOfPostResult)),
            errors => Problem(errors));
    }
    
    [AllowAnonymous]
    [HttpGet("get-post-by-id-{id}")]
    public async Task<IActionResult> GetPostByIdAsync([FromRoute] Guid id)
    {
        var getPostResult = await mediatr.Send(new GetPostByIdQuery(id));

        return getPostResult.Match(
            getPostResult => Ok(mapper.Map<GetPostResponse>(getPostResult)),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpGet("get-post-by-name")]
    public async Task<IActionResult> GetPostByNameAsync([FromQuery] GetFilteredListRequest types, string name, int page, int sizeOfPage)
    {
        var getPostResult = await mediatr.Send(mapper.Map<GetPostByNameQuery>((types, name,page,sizeOfPage)));

        return getPostResult.Match(
            getPostResult => Ok(mapper.Map<PagedList<GetListOfPostResponse>>(getPostResult)),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpGet("get-name-of-post")]
    public async Task<IActionResult> GetNameOfPostAsync([FromQuery] GetFilteredListRequest types,string name="")
    {
        var getPostResult = await mediatr.Send(mapper.Map<GetNameOfPostQuery>((types,name)));

        return getPostResult.Match(
            getPostResult => Ok(getPostResult),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpGet("get-filtered-list-by-type")]
    public async Task<IActionResult> GetFilteredListAsync([FromQuery] GetFilteredListRequest types, int page, int sizeOfPage)
    {
        var getlistOfPostResult = await mediatr.Send(mapper.Map<GetFilteredListQuery>((types,page,sizeOfPage)));

        return getlistOfPostResult.Match(
            getlistOfPostResult => Ok(mapper.Map<PagedList<GetListOfPostResponse>>(getlistOfPostResult)),
            errors => Problem(errors));
    }
    [AllowAnonymous]
    [HttpGet("get-type-of-rent-list")]
	public async Task<IActionResult> GetTypeOfRentListAsync()
	{
		var getTypeOfPostListResult = await mediatr.Send(new GetTypeOfRentListQuery());

		return getTypeOfPostListResult.Match(
			getTypeOfPostListResult => Ok(mapper.Map<List<GetTypeOfPostResponse>>(getTypeOfPostListResult)),
			errors => Problem(errors));
	}
    [AllowAnonymous]
    [HttpGet("get-categories-list")]
	public async Task<IActionResult> GetCategoriesListAsync()
	{
		var getCategoriesListResult = await mediatr.Send(new GetCategoriesListQuery());

		return getCategoriesListResult.Match(
			getCategoriesListResult => Ok(mapper.Map<List<GetCategoryResponse>>(getCategoriesListResult)),
			errors => Problem(errors));
	}

	[AllowAnonymous]
	[HttpGet("get-countries-list")]
	public async Task<IActionResult> GetCountriesListAsync()
	{
		var getCountriesListResult = await mediatr.Send(new GetCountriesListQuery());

		return getCountriesListResult.Match(
			getCountriesListResult => Ok(mapper.Map <List<GetCountryResponse>> (getCountriesListResult)),
			errors => Problem(errors));
	}

    [AllowAnonymous]
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

	[HttpGet("get-post-list-for-realtor")]
	public async Task<IActionResult> GetPostListForRealtorAsync(
	[FromQuery] int page, int sizeOfPage)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var getPostListForRealtor = await mediatr.Send(new GetPostListForRealtorQuery(
			page, sizeOfPage, Guid.Parse(userId)));

		return getPostListForRealtor.Match(
			getPostListForRealtor => Ok(
				mapper.Map<PagedList<GetPostListForRealtorResponse>>(getPostListForRealtor)),
			errors => Problem(errors));
	}

	[HttpPost("edit-post")]
	public async Task<IActionResult> EditPostAsync(EditPostRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var images = new List<byte[]>();

		if (request.Images != null && request.Images.Count != 0)
		{
			foreach (var image in request.Images)
			{
				using MemoryStream memoryStream = new();
				await image.CopyToAsync(memoryStream);
				images.Add(memoryStream.ToArray());
			}
		}

		var editPostResult = await mediatr.Send(mapper.Map<EditPostCommand>(
			(request, Guid.Parse(userId), images)));

		return editPostResult.Match(
			editPostResult => Ok(editPostResult),
			errors => Problem(errors));
	}

	[HttpGet("archive-post-{postId}")]
	public async Task<IActionResult> ArchivePostAsync([FromRoute] Guid postId)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var archivePostResult = await mediatr.Send(new ArchivePostCommand(postId, Guid.Parse(userId)));

		return archivePostResult.Match(
			getPostListForRealtor => Ok(archivePostResult),
			errors => Problem(errors));
	}
}
