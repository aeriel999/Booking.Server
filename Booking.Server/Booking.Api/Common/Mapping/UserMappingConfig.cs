using Booking.Api.Contracts.Users.Common.ChangePassword;
using Booking.Api.Contracts.Users.Realtor.Edit;
using Booking.Api.Contracts.Users.Realtor.Get;
using Booking.Application.Users.Common.ChangePassword;
using Booking.Application.Users.Realtor.EditRealtor;
using Booking.Domain.Users;
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

		config.NewConfig<(ChangePasswordRequest changePassword, string UserId),	ChangePasswordCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest, src => src.changePassword);

		config.NewConfig<User, GetRealtorResponse>()
			.Map(dest => dest.Id, src => src.Id)
			.Map(dest => dest.Name, src => $"{src.FirstName} {src.LastName}");
	}
}
