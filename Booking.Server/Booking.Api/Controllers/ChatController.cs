using Booking.Api.Contracts.Chat.ChatRoomForClient;
using Booking.Api.Contracts.Chat.CreateChat;
using Booking.Api.Contracts.Chat.DeleteChat;
using Booking.Api.Contracts.Chat.GetChatMessageInfo;
using Booking.Api.Contracts.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;
using Booking.Api.Contracts.Chat.SetMessagesReadtByChatId;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Infrastructure;
using Booking.Application.Chat.CheckChatForClientIsExist;
using Booking.Application.Chat.DeleteChat;
using Booking.Application.Chat.GetChatIdList;
using Booking.Application.Chat.GetChatRoomForClientByPostId;
using Booking.Application.Chat.GetChatRoomsList;
using Booking.Application.Chat.GetChatRoomsListForClient;
using Booking.Application.Chat.GetGeneralCountOfUnreadedMessages;
using Booking.Application.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Application.Chat.GetListOfPostInfoForChatsForRealtor;
using Booking.Application.Chat.GetMessageListByChatId;
using Booking.Application.Chat.GetNumberOfUnleastMessages;
using Booking.Application.Chat.SetMessagesReadtByChatId;
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

        return getListOfChatRoomsForClientResult.Match(
            getListOfChatRoomsForClientResult => Ok(getListOfChatRoomsForClientResult),
            errors => Problem(errors));
    }


	[HttpGet("get-unread-messages-count")]
	public async Task<IActionResult> GetNumberOfUnreadMessagesAsync()
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
	public async Task<IActionResult> GetChatIdListForListeningAsync()
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


    [HttpGet("get-chat-room-by-id")]
    public async Task<IActionResult> GetChatRoomByIdAsync([FromQuery] Guid chatRoomId)
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var getChatRoomById = await mediatr.Send(
            new GetChatRoomByIdQuery(chatRoomId));

        return getChatRoomById.Match(
            getChatRoomById => Ok(
                mapper.Map<ChatRoomForClientResponse>(getChatRoomById)),
            errors => Problem(errors));
    }


	[HttpGet("get-message-list-by-chatId")]
	public async Task<IActionResult> GetMessageListByChatIdAsync([FromQuery] Guid chatRoomId)
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var getMessageListByChatIdResult = await mediatr.Send(
			new GetMessageListByChatIdQuery(chatRoomId, Guid.Parse(userId)));

		return getMessageListByChatIdResult.Match(
			getMessageListByChatIdResult => Ok(
				mapper.Map<List<GetChatMessageInfoResponse>>(getMessageListByChatIdResult)),
			errors => Problem(errors));
	}

	[HttpPost("set-messages-read-by-chatId")]
	public async Task<IActionResult> SetMessagesReadedByChatIdAsync(SetMessagesReadtByChatIdRequest request)
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var setMessagesReadtByChatIdResult = await mediatr.Send(
			new SetMessagesReadtByChatIdCommand(request.ChatRoomId, Guid.Parse(userId)));

		return setMessagesReadtByChatIdResult.Match(
			setMessagesReadtByChatIdResult => Ok(),
			errors => Problem(errors));
	}

 
}