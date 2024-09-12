using Booking.Api.Contracts.Chat.ChatRoomForClient;
using Booking.Api.Contracts.Chat.CreateMessage;
using Booking.Application.Chat.CreateMessage;
using Booking.Domain.Chat;
using Mapster;

namespace Booking.Api.Common.Mapping;

public class ChatMapping : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<(InputMessage inputMessage, Guid UserId), CreateMessageCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest, src => src.inputMessage);

		config.NewConfig<ChatRoom, ChatRoomForClientResponse>()
		.Map(desp => desp.PostName, src => src.Post!.Name)
		.Map(desp => desp.PostImage, src => src.Post!.ImagesPost!.FirstOrDefault(i => i.Priority == 1)!.Name)
		.Map(desp => desp.RealtorName, src => $"{src!.Post!.User!.FirstName} {src!.Post!.User!.LastName}")
		.Map(desp => desp.RealtorAvatar, src => src!.Post!.User!.Avatar)
		.Map(desp => desp.ListOfMessages, src => src.UserMessages);

    }
}
