using Booking.Api.Contracts.Chat.CreateChat;
using Booking.Api.Contracts.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Infrastructure;
using Booking.Application.Chat.GetChatIdList;
using Booking.Application.Chat.GetChatRoomsList;
using Booking.Application.Chat.GetChatRoomsListForClient;
using Booking.Application.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Application.Chat.GetListOfPostInfoForChatsForRealtor;
using Booking.Application.Chat.GetNumberOfUnleastMessages;
using Booking.Application.Posts.GetPostIdListForRealtor;
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
public class ChatController(ISender mediatr, IMapper mapper) : ApiController
{
	[HttpGet("chat-list")]
	public async Task<IActionResult> GetListOfChatsAsync()
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
		var useRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

		var getListOfChatRoomsResult = await mediatr.Send(
			new GetChatRoomsListQuery(Guid.Parse(userId), useRole));

		//ToDo Make response
		return getListOfChatRoomsResult.Match(
			getListOfChatRoomsResult => Ok(getListOfChatRoomsResult),
			errors => Problem(errors));
	}

    [HttpGet("get-chat-list-for-client")]
    public async Task<IActionResult> GetListOfChatsForClientAsync()
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var getListOfChatRoomsForClientResult = await mediatr.Send(
            new GetChatRoomsListForClientQuery(Guid.Parse(userId)));

        //ToDo Make response
        return getListOfChatRoomsForClientResult.Match(
            getListOfChatRoomsForClientResult => Ok(getListOfChatRoomsForClientResult),
            errors => Problem(errors));
    }


	[HttpGet("get-unread-messages-count")]
	public async Task<IActionResult> GetNumberOfUnleastMessagesAsync()
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var getNumberOfUnleastMessagesResult = await mediatr.Send(
			new GetNumberOfUnleastMessagesQuery(Guid.Parse(userId)));

		return getNumberOfUnleastMessagesResult.Match(
			getListOfChatRoomsResult => Ok(getListOfChatRoomsResult),
			errors => Problem(errors));
	}


	[HttpGet("get-post-id-list-for-realtor")]
	public async Task<IActionResult> GetPostIdListForListeningChatsByRealtorAsync()
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var getPostIdListForRealtorResult = await mediatr.Send(
			new GetPostIdListForRealtorQuery(Guid.Parse(userId)));

		return getPostIdListForRealtorResult.Match(
			getPostIdListForRealtorResult => Ok(
				getPostIdListForRealtorResult),
			errors => Problem(errors));
	}

	[HttpGet("get-chat-id-list")]
	public async Task<IActionResult> GetChatIdListAsync()
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
		var useRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

		var getChatIdListResult = await mediatr.Send(
			new GetChatIdListQuery(Guid.Parse(userId), useRole));

		return getChatIdListResult.Match(
			getChatIdListResult => Ok(
				getChatIdListResult),
			errors => Problem(errors));
	}

	[HttpGet("get-list-of-postinfo-for-chats-for-realtor")]
	public async Task<IActionResult> GetListOfPostInfoForChatsForRealtorAsync()
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var getPostIdListForRealtorResult = await mediatr.Send(
			new GetListOfPostInfoForChatsForRealtorQuery(Guid.Parse(userId)));

		return getPostIdListForRealtorResult.Match(
			getPostIdListForRealtorResult => Ok(
				mapper.Map<List<GetListOfPostInfoForChatsForRealtorResponse>>(getPostIdListForRealtorResult)),
			errors => Problem(errors));
	}


	[HttpGet("get-list-of-chats-by-post-for-realtor")]
	public async Task<IActionResult> GetListOfChatsByPostInfoForRealtorAsync([FromQuery] CreateChatRequest request)
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var getListOfChatsByPostInfoForRealtorResult = await mediatr.Send(
			mapper.Map<GetListOfChatsByPostInfoForRealtorQuery>((Guid.Parse(userId), request)));

		return getListOfChatsByPostInfoForRealtorResult.Match(
			getListOfChatsByPostInfoForRealtorResult => Ok(
				mapper.Map<List<GetListOfChatsByPostInfoForRealtorResponse>>(getListOfChatsByPostInfoForRealtorResult)),
			errors => Problem(errors));
	}
}