using Booking.Api.Contracts.Authetication.Register;
using Booking.Api.Contracts.Users.Realtor.Edit;
using Booking.Application.Authentication.Register;
using Booking.Application.Users.Realtor;
using Mapster;

namespace Booking.Api.Common.Mapping;

public class UserMappingConfig : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<(
			EditRealtorPrifileInfoRequest editRealtorPrifileInfo, string UserId, string BaseUrl, byte[] Avatar),
			EditRealtorPrifileInfoCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest.BaseUrl, src => src.BaseUrl)
		.Map(dest => dest.Avatar, src => src.Avatar)
		.Map(dest => dest, src => src.editRealtorPrifileInfo);

		config.NewConfig<EditRealtorPrifileInfoCommandResult, EditRealtorPrifileInfoResponse>();
	}
}
