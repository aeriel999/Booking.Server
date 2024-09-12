using Booking.Api.Contracts.Chat.CreateChat;
using Booking.Api.Contracts.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;
using Booking.Api.Contracts.Post.CreatePost;
using Booking.Application.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Application.Posts.CreatePost;
using Booking.Domain.Chat;
using Booking.Domain.Posts;
using Mapster;

namespace Booking.Api.Common.Mapping;

public class ChatMapping : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<Post, GetListOfPostInfoForChatsForRealtorResponse>()
		   .Map(desp => desp.PostId, src => src.Id)
		   .Map(desp => desp.PostName, src => src.Name)
		   .Map(desp => desp.Image, src => src.ImagesPost!.FirstOrDefault(i => i.Priority == 1)!.Name)
		   .Map(desp => desp.NumberOfUnreadMessages,
				src => src.ChatRooms!.Sum(c => c.NumberOfUnreadMessages));

		config.NewConfig<List<Post>, List<GetListOfPostInfoForChatsForRealtorResponse>>();


		config.NewConfig<(Guid UserId, CreateChatRequest request), GetListOfChatsByPostInfoForRealtorQuery>()
			 .Map(desp => desp.UserId, src => src.UserId)
			 .Map(dest => dest, src => src.request);

		config.NewConfig<ChatRoom, GetListOfChatsByPostInfoForRealtorResponse>()
		   .Map(desp => desp.ChatId, src => src.ChatRoomId)
		   .Map(desp => desp.NumberOfUnreadMessages, src => src.NumberOfUnreadMessages)
		   .Map(desp => desp.Image, src => src.Client!.Avatar)
		   .Map(desp => desp.ChatName, src => src.Client!.UserName);

		config.NewConfig<List<ChatRoom>, List<GetListOfChatsByPostInfoForRealtorResponse>>();
	}
}
