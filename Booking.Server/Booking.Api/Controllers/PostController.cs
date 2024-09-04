using Booking.Api.Contracts.Post.CreatePost;
using Booking.Api.Contracts.Post.GetArchivedPostListForRealtor;
using Booking.Api.Contracts.Post.GetCategories;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Contracts.Post.GetCountries;
using Booking.Api.Contracts.Post.GetFilteredList;
using Booking.Api.Contracts.Post.GetListOfPost;
using Booking.Api.Contracts.Post.GetPost;
using Booking.Api.Contracts.Post.GetPostListByRealtorId;
using Booking.Api.Contracts.Post.GetPostListForRealtor;
using Booking.Api.Contracts.Post.GetStreets;
using Booking.Api.Infrastructure;
using Booking.Application.Common.Behaviors;
using Booking.Application.Posts.ArchivePost;
using Booking.Application.Posts.CreatePost;
using Booking.Application.Posts.DeletePost;
using Booking.Application.Posts.EditPost;
using Booking.Application.Posts.GetArchivedPostList;
using Booking.Application.Posts.GetCategoriesList;
using Booking.Application.Posts.GetCities;
using Booking.Application.Posts.GetCountries;
using Booking.Application.Posts.GetFilteredList;
using Booking.Application.Posts.GetListOfPost;
using Booking.Application.Posts.GetNameOfPost;
using Booking.Application.Posts.GetPostById;
using Booking.Application.Posts.GetPostByName;
using Booking.Application.Posts.GetPostListByRealtorId;
using Booking.Application.Posts.GetPostListForRealtor;
using Booking.Application.Posts.GetStreets;
using Booking.Application.Posts.RepostPost;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Booking.Application.Posts.GetTypesOfRest;
using Booking.Api.Contracts.Post.GetTypeOfRest;
using Booking.Application.Posts.GetPostsWithMostRating;
using Booking.Api.Contracts.Post.GetPostWithMostRating;
using Booking.Application.Posts.GetPostsWithMostDiscount;
using Booking.Api.Contracts.Post.GetPostWithMostDiscount;
using Booking.Api.Contracts.Post.GetPostPostTypesOfRest;
using Booking.Api.Contracts.Post.EditPost;
using Booking.Application.Posts.SendFeedback;
using Booking.Application.Posts.GetFeedbacks;
using Booking.Application.Posts.GetRealtorsByUserFeedbacks;
using Booking.Api.Contracts.Post.SentFeedback;
using Booking.Api.Contracts.Post.Feedback;
using Booking.Api.Contracts.Post.GetRealtorByUserFeedback;
using Booking.Application.Posts.GetPostTypesOfRestList;
using Booking.Application.Posts.GetCategoriesFilteredList;
using Booking.Application.Posts.GetCountriesFilteredList;
using Booking.Application.Posts.GetCitiesFilteredList;
using Booking.Application.Posts.GetServicesList;
using Booking.Api.Contracts.Post.GetServicesList;
using Booking.Application.Posts.CreateRoom;
using Booking.Api.Contracts.Post.GetPostForEditing;
using Booking.Application.Posts.GetFeedbacksByClient;
using Booking.Api.Contracts.Post.GetHistoryOfFeedbacks;
using Booking.Api.Contracts.Post.GetPageOfSelectedFeedback;
using Booking.Api.Contracts.Post.EditRoom;
using Booking.Application.Posts.EditRoom;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class PostController(ISender mediatr, IMapper mapper) : ApiController
{
	[HttpPost("create-post")]
	public async Task<IActionResult> CreatePostAsync([FromForm]CreatePostRequest request)
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

		var mainImage = new byte[byte.MaxValue];

		if (request.MainImage != null && request.MainImage.Length != 0)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				await request.MainImage.CopyToAsync(memoryStream);

				mainImage = memoryStream.ToArray();
			}
		}

		var createPostResult = await mediatr.Send(mapper.Map<CreatePostCommand>(
			(request, Guid.Parse(userId), images, mainImage)));

		return createPostResult.Match(
			createPostResult => Ok(createPostResult),
			errors => Problem(errors));
	}


	[HttpPost("create-room")]
	public async Task<IActionResult> CreateRoomAsync([FromForm] CreateRoomRequest request)
	{ 
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var mainImage = new byte[byte.MaxValue];

		if (request.MainImage != null && request.MainImage.Length != 0)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				await request.MainImage.CopyToAsync(memoryStream);

				mainImage = memoryStream.ToArray();
			}
		}

		var createRoomResult = await mediatr.Send(mapper.Map<CreateRoomCommand>(
			(request, Guid.Parse(userId), mainImage)));

		return createRoomResult.Match(
			createRoomResult => Ok(createRoomResult),
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
    public async Task<IActionResult> GetPostByNameAsync(
		[FromQuery] GetFilteredListRequest types, string name)
    {
        var getPostResult = await mediatr.Send(mapper.Map<GetPostByNameQuery>((types, name)));

        return getPostResult.Match(
            getPostResult => Ok(getPostResult),
            errors => Problem(errors));
    }


    [AllowAnonymous]
    [HttpGet("get-name-of-post")]
    public async Task<IActionResult> GetNameOfPostAsync([FromQuery] GetFilteredListRequest types,string name = "")
    {
        var getPostResult = await mediatr.Send(mapper.Map<GetNameOfPostQuery>((types,name)));

        return getPostResult.Match(
            getPostResult => Ok(getPostResult),
            errors => Problem(errors));
    }


    [AllowAnonymous]
    [HttpGet("get-filtered-list-by-type")]
    public async Task<IActionResult> GetFilteredListAsync(
		[FromQuery] GetFilteredListRequest types, int page, int sizeOfPage)
    {
        var getlistOfPostResult = await mediatr.Send(mapper.Map<GetFilteredListQuery>((types,page,sizeOfPage)));

        return getlistOfPostResult.Match(
            getlistOfPostResult => Ok(mapper.Map<PagedList<GetListOfPostResponse>>(getlistOfPostResult)),
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
    [HttpGet("get-categories-filtered-list")]
    public async Task<IActionResult> GetCategoriesFilteredListAsync([FromQuery] Guid? Country, Guid? City, Guid? Realtor)
    {
        var getCategoriesListResult = await mediatr.Send(new GetCategoriesFilteredListQuery(Country, City, Realtor));

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
    [HttpGet("get-countries-filtered-list")]
    public async Task<IActionResult> GetCountriesFilteredListAsync([FromQuery] Guid? Category, Guid? Realtor)
    {
        var getCountriesListResult = await mediatr.Send(new GetCountriesFilteredListQuery(Category, Realtor));

        return getCountriesListResult.Match(
            getCountriesListResult => Ok(mapper.Map<List<GetCountryResponse>>(getCountriesListResult)),
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


    [AllowAnonymous]
    [HttpGet("get-cities-filtered-list")]
    public async Task<IActionResult> GetCitiesFilteredListAsync([FromQuery] Guid? Category,Guid Country ,Guid? Realtor)
    {
        var getCitiesListResult = await mediatr.Send(new GetCitiesFilteredListQuery(Category, Country, Realtor));

        var response = getCitiesListResult == null ? null
            : mapper.Map<List<GetCityResponse>>(getCitiesListResult);

        return Ok(response);
    }

    [AllowAnonymous]
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


    [AllowAnonymous]
    [HttpGet("get-post-list-by-realtor-id-{id}")]
    public async Task<IActionResult> GetPostListByRealtorIdForChatsAsync([FromRoute] Guid id)
    {

        var getPostListByRealtorId = await mediatr.Send(new GetPostListByRealtorIdQuery(id));

        return getPostListByRealtorId.Match(
            getPostListByRealtorId => Ok(
                mapper.Map<List<GetPostListByRealtorIdResponse>>(getPostListByRealtorId)),
            errors => Problem(errors));
    }


	[HttpPost("edit-post")]
	public async Task<IActionResult> EditPostAsync(EditPostRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var images = request.Images == null ? null : new List<byte[]>();

		if (request.Images != null && request.Images.Count != 0)
		{
			foreach (var image in request.Images)
			{
				using MemoryStream memoryStream = new();
				await image.CopyToAsync(memoryStream);
				images!.Add(memoryStream.ToArray());
			}
		}

		var mainImage = request.MainImage == null ? null : new byte[byte.MaxValue];

		if (request.MainImage != null && request.MainImage.Length != 0)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				await request.MainImage.CopyToAsync(memoryStream);

				mainImage = memoryStream.ToArray();
			}
		}

		var editPostResult = await mediatr.Send(mapper.Map<EditPostCommand>(
			(request, Guid.Parse(userId), images, mainImage)));

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
			getPostListForRealtor => Ok(archivePostResult.Value),
			errors => Problem(errors));
	}
	

	[HttpGet("get-archived-post-list-for-realtor")]
	public async Task<IActionResult> GetArchivedPostListForRealtorAsync([FromQuery] int page, int sizeOfPage)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var getArchivedPostListForRealtor = await mediatr.Send(new GetArchivedPostListForRealtorQuery(
			page, sizeOfPage, Guid.Parse(userId)));

		PagedList<GetArchivedPostListForRealtorResponse> list = mapper.Map<PagedList<GetArchivedPostListForRealtorResponse>>(getArchivedPostListForRealtor);

		return Ok(list);
	}


	[HttpGet("delete-post-{postId}")]
	public async Task<IActionResult> DeletePostAsync([FromRoute] Guid postId)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var deletePostResult = await mediatr.Send(new DeletePostCommand(postId, Guid.Parse(userId)));

		return deletePostResult.Match(
			getPostListForRealtor => Ok(deletePostResult.Value),
			errors => Problem(errors));
	}


	[HttpGet("repost-post-{postId}")]
	public async Task<IActionResult> RepostPostAsync([FromRoute] Guid postId)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var repostPostResult = await mediatr.Send(new RepostPostCommand(postId, Guid.Parse(userId)));

		return repostPostResult.Match(
			getPostListForRealtor => Ok(repostPostResult.Value),
			errors => Problem(errors));
	}

	[AllowAnonymous]
	[HttpGet("get-types-of-rest")]

	public async Task<IActionResult> GetTypesOfRestAsync()
	{
		var typesOfRest = await mediatr.Send(new GetTypesOfRestQuery());

		return typesOfRest.Match(
			result => Ok(mapper.Map<List<GetTypeOfRestResponse>>(result)),
			errors => Problem(errors));
	}

    [AllowAnonymous]
    [HttpGet("get-posts-with-most-rating")]

    public async Task<IActionResult> GetPostsWithMostRatingAsync()
    {
        var postsWithMostRating = await mediatr.Send(new GetPostsWithMostRatingQuery());

        return postsWithMostRating.Match(
            result => Ok(mapper.Map<List<GetPostWithMostRatingResponse>>(result)),
            errors => Problem(errors));
    }

    [AllowAnonymous]
    [HttpGet("get-posts-with-most-discount")]
    public async Task<IActionResult> GetPostsWithMostDiscountAsync()
    {
        var postsWithMostDiscount = await mediatr.Send(new GetPostsWithMostDiscountQuery());

        return postsWithMostDiscount.Match(
            result => Ok(mapper.Map<List<GetPostWithMostDiscountResponse>>(result)),
            errors => Problem(errors));
    }

	 
	[HttpGet("get-post-types-of-rest-list")]
	public async Task<IActionResult> GetPostTypesOfRestListAsync()
	{
		var getPostTypesOfRestResult = await mediatr.Send(new GetPostTypesOfRestListQuery());

		return getPostTypesOfRestResult.Match(
			getPostTypesOfRestResult => Ok(mapper.Map<List<GetPostTypesOfRestResponse>>(getPostTypesOfRestResult)),
			errors => Problem(errors));
	}


    [HttpPost("send-feedback")]
    public async Task<IActionResult> SendFeedbackAsync([FromBody] SendFeedbackRequest request)
    {
        string clientId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var sendFeedbackResult = await mediatr.Send(mapper.Map<SendFeedbackCommand>((request, clientId)));

        return sendFeedbackResult.Match(
            sendFeedbackResult => Ok(sendFeedbackResult),
            errors => Problem(errors));
    }


    [AllowAnonymous]
    [HttpGet("get-feedbacks-{id}")]
    public async Task<IActionResult> GetFeedbacksAsync([FromRoute] Guid id, [FromQuery] int page, int sizeOfPage)
    {
        var getFeedbacksResult = await mediatr.Send(new GetFeedbacksQuery(id, page, sizeOfPage));

        return getFeedbacksResult.Match(
            getFeedbacksResult => Ok(mapper.Map<PagedList<GetFeedbackResponse>>(getFeedbacksResult)),
            errors => Problem(errors));
    }

    [HttpGet("get-history-of-feedbacks-by-client")]
    public async Task<IActionResult> GetHistoryOfFeedbacksByClientAsync([FromQuery] int page, int sizeOfPage)
    {
		var clientId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var getHistoryOfFeedbacksResult = await mediatr.Send(mapper.Map<GetHistoryOfFeedbacksByClientQuery>((clientId, page, sizeOfPage)));

        return getHistoryOfFeedbacksResult.Match(
            getHistoryOfFeedbacksResult => Ok(mapper.Map<PagedList<GetHistoryOfFeedbackByClientResponse>>(getHistoryOfFeedbacksResult)),
            errors => Problem(errors));
    }

    [HttpGet("get-posts-by-user-feedbacks")]
    public async Task<IActionResult> GetPostsByUserFeedbacksAsync()
    {
        string clientId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var getPostsResult = await mediatr.Send(new GetPostsByUserFeedbacksQuery(Guid.Parse(clientId)));

        return getPostsResult.Match(
            getPostsResult => Ok(mapper.Map<List<GetPostByUserFeedbackResponse>>(getPostsResult)),
            errors => Problem(errors));
    }
	[AllowAnonymous]
	[HttpGet("get-services-list")]
	public async Task<IActionResult> GetServicesListAsync()
	{
		var getServicesListResult = await mediatr.Send(new GetServicesListQuery());

		return getServicesListResult.Match(
			getServicesListResult => Ok(mapper.Map<List<GetServicesListResponse>>(getServicesListResult)),
			errors => Problem(errors));
	}

	[HttpGet("get-post-for-edit-by-id-{id}")]
	public async Task<IActionResult> GetPostForEditByIdAsync([FromRoute] Guid id)
	{
		var getPostForEditResult = await mediatr.Send(new GetPostByIdQuery(id));

		return getPostForEditResult.Match(
			getPostResult => Ok(mapper.Map<GetPostForEditResponse>(getPostForEditResult.Value)),
			errors => Problem(errors));
	}

	[HttpPost("edit-room")]
	public async Task<IActionResult> EditRoomAsync([FromForm] EditRoomRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var mainImage = request.MainImage == null ? null : new byte[byte.MaxValue];

		if (request.MainImage != null && request.MainImage.Length != 0)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				await request.MainImage.CopyToAsync(memoryStream);

				mainImage = memoryStream.ToArray();
			}
		}

		var createRoomResult = await mediatr.Send(mapper.Map<EditRoomCommand>(
			(request, Guid.Parse(userId), mainImage)));

		return createRoomResult.Match(
			createRoomResult => Ok(createRoomResult),
			errors => Problem(errors));
	}


    [HttpGet("get-page-of-selected-feedback-{FeedbackId}")]
    public async Task<IActionResult> GetPageOfSelectedFeedbackAsync([FromRoute] Guid FeedbackId, [FromQuery] Guid PostId)
    {
        var getPageOfSelectedFeedback = await mediatr.Send(new GetPageOfSelectedFeedbackQuery(FeedbackId,PostId));

        return getPageOfSelectedFeedback.Match(
            getPageOfSelectedFeedback => Ok(getPageOfSelectedFeedback),
            errors => Problem(errors));
    }
}
