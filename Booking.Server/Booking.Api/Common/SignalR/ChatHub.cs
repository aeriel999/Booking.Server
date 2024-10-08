﻿using Booking.Api.Contracts.Chat;
using Booking.Api.Contracts.Chat.CreateMessage;
using Booking.Api.Contracts.Chat.GetChatMessageInfo;
using Booking.Application.Chat.CreateChat;
using Booking.Application.Chat.CreateMessage;
using Booking.Application.Chat.DeleteChat;
using Booking.Application.Chat.GetNewMessageInfo;
using Booking.Application.Common.Interfaces.Chat;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;


namespace Booking.Api.Common.SignalR
{
	[Authorize]
	public class ChatHub(
	IUserMessageRepository userMessageRepository, 
	IChatRoomRepository chatRoomRepository,
	IMapper mapper,
	ISender mediatr) : Hub
	{
		//Join for listening of new chats for post.
		//Add in creating of new post or after notify about creating of new chat by user
		public async Task JoinNewChanelOrNewChatRoomForListening(RoomRequest request)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, request.RoomId.ToString());
		}

		//Create new chatroom and join it by client send notify for realtor about new chat
		public async Task<string> JoinNewPostChatByUser(RoomRequest request)
		{
			var userId = Context.User!.Claims.FirstOrDefault(
            x => x.Type == ClaimTypes.NameIdentifier)!.Value;

            //Create and save chatRoom in DB
            var createChatResult = await mediatr
					.Send(new CreateChatCommand(request.RoomId, Guid.Parse(userId)));

			string roomName = "";

			if (createChatResult.IsError)
				return roomName;
			else roomName = createChatResult.Value.ToString();

			//Send notify for realtor about new chat
			await Clients.GroupExcept(request.RoomId.ToString(), new[] { Context.ConnectionId })
			.SendAsync("send_notify", roomName.ToString());

			//Add user to chatRoom
			await Groups.AddToGroupAsync(Context.ConnectionId, roomName.ToString());

			//return roomName;
			return createChatResult.Value.ToString();
		}

		//ToDo test for needing this ability
		//If join if chatRoom is in disconnect state
		public async Task<List<GetChatMessageInfoResponse>?> JoinRoomForListening(RoomRequest request)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, request.RoomId.ToString());

            var userId = Context.User!.Claims.FirstOrDefault(
            u => u.Type == ClaimTypes.NameIdentifier)!.Value;

           // await userMessageRepository.ReadMessagesByChatRoomIdAsync(request.RoomId,Guid.Parse(userId));
            var messageList = await userMessageRepository.GetUserMessagesByChatRoomIdAsync(request.RoomId);

			if (messageList == null)
				return null;

			return mapper.Map<List<GetChatMessageInfoResponse>>(messageList);
		}

		

		//Create  and save new message in Db. Send new message 
		public async Task SendMessage(InputMessage message)
		{
			var userId = Context.User!.Claims.FirstOrDefault(
			u => u.Type == ClaimTypes.NameIdentifier)!.Value;

			//Save message in DB
			var saveUserMessageResult = await mediatr.Send(mapper.Map<CreateMessageCommand>(
				(message, Guid.Parse(userId))));

			//Get Chatroom
			var chatRoom = await chatRoomRepository.GetChatRoomByIdAsync(message.RoomId);

			if (chatRoom == null) return;
			 

			//Make sendMessageResponse
			var sendMessageResponse = new GetNewMessageInfoResponse()
			{
				ChatRoomId = message.RoomId,
				Message = message.Message,
				PostId = chatRoom.PostId,
			};

			//send message in real time
			await Clients.GroupExcept(message.RoomId.ToString(), new[] { Context.ConnectionId })
				.SendAsync("send_message", sendMessageResponse);
		}

		public async Task GetPostNotify(RoomRequest request)
		{
			await Clients.GroupExcept(request.RoomId.ToString(), new[] { Context.ConnectionId })
				.SendAsync("get_message", request.RoomId.ToString());
		}

		//Leave room in deleting of chat or post
		public async Task LeaveRoom(RoomRequest request)
		{
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, request.RoomId.ToString());

            Console.WriteLine($"Клієнт {Context.ConnectionId} покинув кімнату {request.RoomId}");
        }

		public async Task DeleteChatNotify(RoomRequest request)
		{
			await Clients.GroupExcept(request.RoomId.ToString(), new[] { Context.ConnectionId })
				.SendAsync("delete_chat", request.RoomId.ToString());

			await LeaveRoom(request);

			var userId = Context.User!.Claims.FirstOrDefault(
			u => u.Type == ClaimTypes.NameIdentifier)!.Value;

			var deleteChatResult = await mediatr.Send(
			new DeleteChatByIdCommand(request.RoomId, Guid.Parse(userId)));
		}

		public Task SendPrivateMessage(string user, string message)
		{
			return Clients.User(user).SendAsync("ReceiveMessage", message);
		}
	}

}