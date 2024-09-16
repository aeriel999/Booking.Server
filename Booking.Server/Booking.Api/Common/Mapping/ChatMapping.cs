using Booking.Api.Contracts.Chat.CreateChat;
using Booking.Api.Contracts.Chat.ChatRoomForClient;
using Booking.Api.Contracts.Chat.CreateMessage;
using Booking.Api.Contracts.Chat.GetChatMessageInfo;
using Booking.Api.Contracts.Chat.GetListOfChatsByPostInfoForRealtor;
using Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;
using Booking.Application.Chat.CreateMessage;
using Booking.Application.Chat.GetListOfChatsByPostInfoForRealtor;
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
		src => src.ChatRooms!.Sum(c => c.UserMessages!.Count(m => !m.IsRead && m.UserId != src.UserId)));



		config.NewConfig<List<Post>, List<GetListOfPostInfoForChatsForRealtorResponse>>();


		config.NewConfig<(Guid UserId, CreateChatRequest request), GetListOfChatsByPostInfoForRealtorQuery>()
			 .Map(desp => desp.UserId, src => src.UserId)
			 .Map(dest => dest, src => src.request);

		config.NewConfig<ChatRoom, GetListOfChatsByPostInfoForRealtorResponse>()
		   .Map(desp => desp.Id, src => src.ChatRoomId)
		   .Map(desp => desp.NumberOfUnreadMessages, 
		   src => src.UserMessages!.Count(m => !m.IsRead && m.UserId != src.RealtorId))
		   .Map(desp => desp.Image, src => src.Client!.Avatar)
		   .Map(desp => desp.Name, src => src.Client!.UserName);

		config.NewConfig<List<ChatRoom>, List<GetListOfChatsByPostInfoForRealtorResponse>>();


		config.NewConfig<UserMessage, GetChatMessageInfoResponse>()
		   .Map(desp => desp.UserId, src => src.UserId)
		   .Map(desp => desp.SentAt, src => src.SentAt.ToUniversalTime().ToString("R"))
		   .Map(desp => desp.Text, src => src.Message)
		   .Map(desp => desp.IsRead, src => src.IsRead)
		   .Map(desp => desp.Date, src => src.SentAt);

		config.NewConfig<List<UserMessage>, List<GetChatMessageInfoResponse>>();


		config.NewConfig<(InputMessage inputMessage, Guid UserId), CreateMessageCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest, src => src.inputMessage);


		config.NewConfig<ChatRoom, ChatRoomForClientResponse>()
		.Map(desp => desp.PostName, src => src.Post!.Name)
		.Map(desp => desp.PostImage, src => src.Post!.ImagesPost!.FirstOrDefault(i => i.Priority == 1)!.Name)
		.Map(desp => desp.RealtorName, src => $"{src!.Realtor!.FirstName} {src!.Realtor!.LastName}")
		.Map(desp => desp.RealtorAvatar, src => src!.Realtor!.Avatar);
		//.Map(desp => desp.ListOfMessages, src => src.UserMessages != null ? src.UserMessages : new List<UserMessage>());

    }
}
