using Booking.Api.Contracts.Chat.CreateMessage;
using Booking.Application.Chat.CreateMessage;
using Mapster;

namespace Booking.Api.Common.Mapping;

public class ChatMapping : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<(InputMessage inputMessage, string UserId), CreateMessageCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest, src => src.inputMessage);
	}
}
