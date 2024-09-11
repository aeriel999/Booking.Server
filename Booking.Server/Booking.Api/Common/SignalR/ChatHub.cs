using Booking.Api.Contracts.Chat;
using Booking.Api.Contracts.Chat.CreateMessage;
using Booking.Application.Chat.CreateChat;
using Booking.Application.Chat.CreateMessage;
using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
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
	IMapper mapper,
	ISender mediatr) : Hub
	{
		//Join for listening of new chats for post.
		//Add in creating of new post or after notify about creating of new chat by user
		public async Task<string> JoinNewChanelOrNewChatRoomForListening(RoomRequest request)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, request.RoomId.ToString());

			return request.RoomId.ToString();
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

			return roomName;
		}

		//ToDo test for needing this ability
		//If join if chatRoom is in disconnect state
		public async Task<List<UserMessage>?> JoinRoomForListening(RoomRequest request)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, request.RoomId.ToString());

			return await userMessageRepository.GetUserMessagesByChatRoomIdAsync(request.RoomId);
		}

		//Live room in deleting of chat or post
		public Task LeaveRoom(RoomRequest request)
		{
			return Groups.RemoveFromGroupAsync(Context.ConnectionId, request.RoomId.ToString());
		}

		//Create  and save new message in Db. Send new message 
		public async Task SendMessage(InputMessage message)
		{
			var userId = Context.User!.Claims.FirstOrDefault(
			u => u.Type == ClaimTypes.NameIdentifier)!.Value;

			//Save message in DB
			var saveUserMessageResult = await mediatr.Send(mapper.Map<CreateMessageCommand>(
				(message, Guid.Parse(userId))));

			//send message in real time
			await Clients.GroupExcept(message.RoomId.ToString(), new[] { Context.ConnectionId })
				.SendAsync("send_message", message.Message);
		}

		public Task SendPrivateMessage(string user, string message)
		{
			return Clients.User(user).SendAsync("ReceiveMessage", message);
		}


		//public async Task JoinExistPostRoomByClient(RoomRequest request)
		//{
		//	await Groups.AddToGroupAsync(Context.ConnectionId, request.RoomId.ToString());

		//}

		//public async Task<string> JoinRoomByClientForPost(RoomRequest request)
		//{
		//	var userId = Context.UserName.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;

		//	var chatRoom = await chatRoomRepository.GetChatRoomForUserIdAndPostIdAsync(
		//		Guid.Parse(userId), request.RoomId);

		//	string roomName = "";

		//	if (chatRoom == null)
		//	{
		//		var createChatResult = await mediatr
		//			.Send(new CreateChatCommand(request.RoomId, userId));

		//		if (createChatResult.IsError)
		//			return string.Empty;
		//		else roomName = createChatResult.Value.ToString();

		//		await Clients.GroupExcept(request.RoomId.ToString(), new[] { Context.ConnectionId })
		//		.SendAsync("send_notify", roomName.ToString());
		//	}
		//	else
		//		roomName = chatRoom.ChatRoomId.ToString();

		//	await Groups.AddToGroupAsync(Context.ConnectionId, roomName.ToString());

		//	return roomName;
		//}

	}

}