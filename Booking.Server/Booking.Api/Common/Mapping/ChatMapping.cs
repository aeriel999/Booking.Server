using Booking.Api.Contracts.Chat.GetListOfPostInfoForChatsForRealtor;
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
	}
}
