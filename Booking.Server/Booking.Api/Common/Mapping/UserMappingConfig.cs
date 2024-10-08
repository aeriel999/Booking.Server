﻿using Booking.Api.Contracts.Users.Common.ChangePassword;
using Booking.Api.Contracts.Users.Realtor.Edit;
using Booking.Api.Contracts.Users.Realtor.Get;
using Booking.Api.Contracts.Users.Realtor.Get.Information;
using Booking.Api.Contracts.Users.User.Edit;
using Booking.Application.Users.Common.ChangePassword;
 
using Booking.Application.Users.Realtor.EditRealtor;
using Booking.Domain.Users;
using Mapster;
using Booking.Application.Users.Client.EditUser;
using Booking.Application.Common.Behaviors;
using Booking.Api.Contracts.Users.User.GetListOfAllUsersForAdmin;
using Booking.Api.Contracts.Users.Realtor.GetListOfAllRealtorsForAdmin;
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

        config.NewConfig<EditUserProfileCommandResult, EditUserProfileResponse>();


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
            .Map(dest => dest.Phone, src => src.PhoneNumber)
			.Map(desp => desp.HeaderImage, src => src.ProfileHeaderImage);


        config.NewConfig<(EditUserProfileRequest request, string Id,string baseUrl), EditUserProfileCommand>()
            .Map(desp => desp.Id, src => Guid.Parse(src.Id))
            .Map(desp => desp.Email, src => src.request.Email)
            .Map(desp => desp.FirstName, src => src.request.FirstName)
            .Map(desp => desp.LastName, src => src.request.LastName)
            .Map(desp => desp.baseUrl, src => src.baseUrl);

		config.NewConfig<User, GetListOfAllUsersForAdminResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Name, src => src.UserName)
			.Map(desp => desp.Email, src => src.Email)
			.Map(desp => desp.IsEmailConfirmed, src => src.EmailConfirmed)
			.Map(desp => desp.IsActive, 
				src => src.LockoutEnd == null || src.LockoutEnd <= DateTime.UtcNow);

		config.NewConfig<PagedList<User>, PagedList<GetListOfAllUsersForAdminResponse>>();

		config.NewConfig<User, GetListOfAllRealtorsForAdminResult>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Name, src => src.UserName)
			.Map(desp => desp.Email, src => src.Email)
			.Map(desp => desp.IsEmailConfirmed, src => src.EmailConfirmed)
			.Map(desp => desp.PhoneNumber, src => src.PhoneNumber)
			.Map(desp => desp.Rate, src => src.Rating)
			.Map(desp => desp.IsActive,
				src => src.LockoutEnd == null || src.LockoutEnd <= DateTime.UtcNow);

		config.NewConfig<PagedList<User>, PagedList<GetListOfAllRealtorsForAdminResult>>();
	}
}
