using Booking.Api.Contracts.Users.Common.ChangePassword;
using Booking.Api.Contracts.Users.Realtor.Edit;
using Booking.Api.Contracts.Users.Realtor.Get;
using Booking.Api.Contracts.Users.Realtor.Get.Feedback;
using Booking.Api.Contracts.Users.Realtor.Get.GetRealtorByUserFeedback;
using Booking.Api.Contracts.Users.Realtor.Get.Information;
using Booking.Api.Contracts.Users.User.Edit;
using Booking.Api.Contracts.Users.User.SentFeedback;
using Booking.Application.Common.Behaviors;
using Booking.Application.Users.Common.ChangePassword;
using Booking.Application.Users.Realtor;
using Booking.Application.Users.Realtor.EditRealtor;
using Booking.Domain.Users;
using Mapster;
using Booking.Application.Users.Client.EditUser;
using Booking.Application.Users.Client.SendFeedback;

namespace Booking.Api.Common.Mapping;

public class UserMappingConfig : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<(
			EditRealtorPrifileInfoRequest editRealtorPrifileInfo, Guid UserId, string BaseUrl, byte[] Avatar),
			EditRealtorPrifileInfoCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest.BaseUrl, src => src.BaseUrl)
		.Map(dest => dest.Avatar, src => src.Avatar)
		.Map(dest => dest, src => src.editRealtorPrifileInfo);


		config.NewConfig<EditRealtorPrifileInfoCommandResult, EditRealtorPrifileInfoResponse>();


		config.NewConfig<(ChangePasswordRequest changePassword, Guid UserId),	ChangePasswordCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest, src => src.changePassword);


		config.NewConfig<User, GetRealtorResponse>()
			.Map(dest => dest.Id, src => src.Id)
			.Map(dest => dest.Name, src => $"{src.FirstName} {src.LastName}");

		config.NewConfig<User, GetInformationAboutRealtorResponse>()
			.Map(dest => dest.Id, src => src.Id)
			.Map(dest => dest.Name, src => $"{src.FirstName} {src.LastName}")
			.Map(dest => dest.Email, src => src.Email)
			.Map(dest => dest.Avatar, src => src.Avatar)
			.Map(dest => dest.Rating, src => src.Rating)
            .Map(dest => dest.Phone, src => src.PhoneNumber);

		config.NewConfig<(SendFeedbackRequest request, string id), SendFeedbackCommand>()
			.Map(dest => dest.Text, src => src.request.Text)
			.Map(dest => dest.Rating, src => src.request.Rating)
			.Map(dest => dest.RealtorId, src => src.request.RealtorId)
			.Map(dest => dest.ClientId, src => Guid.Parse(src.id));

		config.NewConfig<Feedback, GetFeedbackResponse>()
			.Map(desp => desp.Text, src => src.Text)
			.Map(desp => desp.Rating, src => src.Rating)
			.Map(desp => desp.ClientId, src => src.ClientId)
			.Map(desp => desp.Client, src => src.Client.Email)
			.Map(desp => desp.FeedbackAt, src => src.FeedbackAt);

		config.NewConfig<PagedList<GetFeedbackResponse>, PagedList<Feedback>>()
			.Map(desp => desp.items, src => src.items.Adapt<List<GetFeedbackResponse>>());

		config.NewConfig<User, GetRealtorByUserFeedbackResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Realtor, src => $"{src.FirstName} {src.LastName}")
			.Map(desp => desp.Avatar, src => src.Avatar);

        config.NewConfig<(EditUserProfileRequest request, string Id,string baseUrl), EditUserProfileCommand>()
            .Map(desp => desp.Id, src => Guid.Parse(src.Id))
            .Map(desp => desp.Email, src => src.request.Email)
			.Map(desp => desp.baseUrl, src => src.baseUrl);
    }
}
