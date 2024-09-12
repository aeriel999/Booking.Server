using Booking.Api.Infrastructure;
using Booking.Application.Chat.CheckChatForClientIsExist;
using Booking.Application.Chat.GetChatIdList;
using Booking.Application.Chat.GetChatRoomForClientByPostId;
using Booking.Application.Chat.GetChatRoomsList;
using Booking.Application.Chat.GetChatRoomsListForClient;
using Booking.Application.Chat.GetNumberOfUnleastMessages;
using Booking.Application.Posts.GetListOfFeedbackForRealtor;
using Booking.Application.Posts.GetPostIdListForRealtor;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.Claims;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class ChatController(ISender mediatr, IMapper mapper) : ApiController
{

	//[HttpPost("create")]
	//public async Task<IActionResult> CreateChatAsync(CreateChatRequest request)
	//{
	//	string userId = UserName.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

	//	var createChatResult = await mediatr.Send(mapper.Map<CreateChatCommand>((request, userId)));

	//	return createChatResult.Match(
	//		createChatResult => Ok(createChatResult),
	//		errors => Problem(errors));
	//}

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


    [HttpGet("check-chat-for-client-is-exist")]
    public async Task<IActionResult> CheckChatForClientIsExist([FromQuery] Guid postId)
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var chatIsExist = await mediatr.Send(new CheckChatForClientIsExistQuery(Guid.Parse(userId), postId));

        return chatIsExist.Match(
            chatIsExist => Ok(
                chatIsExist),
            errors => Problem(errors));
    }
    [HttpGet("get-chat-room-for-client-by-post-id")]
    public async Task<IActionResult> GetChatRoomForClientByPostIdAsync([FromQuery] Guid postId)
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var getChatRoomForClient = await mediatr.Send(
            new GetChatRoomForClientByPostIdQuery(postId,Guid.Parse(userId)));

        return getChatRoomForClient.Match(
            getChatRoomForClient => Ok(
                mapper.Map<ChatRoomForClient>(getChatRoomForClient)),
            errors => Problem(errors));
    }
}