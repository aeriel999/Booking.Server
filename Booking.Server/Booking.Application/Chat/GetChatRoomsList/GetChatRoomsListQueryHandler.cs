using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Constants;
using ErrorOr;
using MediatR;

namespace Booking.Application.Chat.GetChatRoomsList;

public class GetChatRoomsListQueryHandler(
	IChatRoomRepository chatRoomRepository,
	IPostRepository postRepository,
	IUserRepository userRepository)
	: IRequestHandler<GetChatRoomsListQuery, ErrorOr<GetChatRoomsListQueryResult>>
{
	public async Task<ErrorOr<GetChatRoomsListQueryResult>> Handle(
		GetChatRoomsListQuery request, CancellationToken cancellationToken)
	{
		//CreatePostPostTypeOfRestAsync 
		List<ChatsForPostListInfo> chatsForPosts  = new();

		var hasNewMsg = false;

		if (request.UserRole == Roles.Realtor)
		{
			//Get list of post of realtor
			var listOfPost = await postRepository.GetListPostByRealtorIdAsync(request.UserId);

			if (listOfPost == null)
				return new GetChatRoomsListQueryResult(null, false);

			foreach (var post in listOfPost)
			{
				//Get List of chats for current post
				var chatRoomList = await chatRoomRepository.GetChatRoomListByPostId(post.Id);

				if (chatRoomList == null)
					continue;

				List<ChatRoomInfo> chatRoomInfoList = new();

				foreach (var chat in chatRoomList)
				{
					foreach (var msg in chat.UserMessages)
					{
						if (!msg.IsRead)
						{
							hasNewMsg = true;
							break;
						}
					}

					var user = await userRepository.GetUserByIdAsync(chat.ClientId);

					var userName = await userRepository.GetUserNameByUserAsync(user.Value);

					var chatRoomInfo = new ChatRoomInfo(hasNewMsg, userName, chat.ChatRoomId);

					chatRoomInfoList.Add(chatRoomInfo);
				}

				var postChat = new ChatsForPostListInfo(hasNewMsg, post.Name, post.Id, chatRoomInfoList);

				chatsForPosts.Add(postChat);
			}
		}

		//if (request.UserRole == Roles.User)
		//	chatRoomList = await chatRoomRepository.GetChatRoomListWithPostByUserIdAsync(
		//		request.UserId);

		//var postChatRooms = new List<ChatsForPostListInfo>();

		//var chatList = new List<ChatRoomInfo>();

		//foreach (ChatRoom chatRoom in chatRoomList)
		//{
			
		//}

		return new GetChatRoomsListQueryResult(chatsForPosts, hasNewMsg);
	}
}
