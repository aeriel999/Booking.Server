using Booking.Api.Contracts.Chat.CreateChat;
using Booking.Api.Contracts.Chat.CreateMessage;
using Booking.Api.Contracts.Chat.GetChatMessageInfo;
using Booking.Api.Contracts.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;
using Booking.Api.Contracts.Post.CreatePost;
using Booking.Application.Chat.CreateMessage;
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
		   .Map(desp => desp.Id, src => src.Id)
		   .Map(desp => desp.Name, src => src.Name)
		   .Map(desp => desp.Image, src => src.ImagesPost!.FirstOrDefault(i => i.Priority == 1)!.Name)
		   .Map(desp => desp.NumberOfUnreadMessages,
				src => src.ChatRooms!.Sum(c => c.NumberOfUnreadMessages));

		config.NewConfig<List<Post>, List<GetListOfPostInfoForChatsForRealtorResponse>>();


		config.NewConfig<(Guid UserId, CreateChatRequest request), GetListOfChatsByPostInfoForRealtorQuery>()
			 .Map(desp => desp.UserId, src => src.UserId)
			 .Map(dest => dest, src => src.request);

		config.NewConfig<ChatRoom, GetListOfChatsByPostInfoForRealtorResponse>()
		   .Map(desp => desp.Id, src => src.ChatRoomId)
		   .Map(desp => desp.NumberOfUnreadMessages, src => src.NumberOfUnreadMessages)
		   .Map(desp => desp.Image, src => src.Client!.Avatar)
		   .Map(desp => desp.Name, src => src.Client!.UserName);

		config.NewConfig<List<ChatRoom>, List<GetListOfChatsByPostInfoForRealtorResponse>>();


		config.NewConfig<UserMessage, GetChatMessageInfoResponse>()
		   .Map(desp => desp.UserId, src => src.UserId)
		   .Map(desp => desp.SentAt, src => src.SentAt.ToUniversalTime())
		   .Map(desp => desp.Text, src => src.Message)
		   .Map(desp => desp.IsRead, src => src.IsRead);

		config.NewConfig<List<UserMessage>, List<GetChatMessageInfoResponse>>();

		config.NewConfig<(Guid UserId, InputMessage request), CreateMessageCommand>()
			 .Map(desp => desp.UserId, src => src.UserId)
			 .Map(dest => dest, src => src.request);

	}
}
