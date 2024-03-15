﻿using Booking.Api.Contracts.Authetication.ConfirmEmail;
using Booking.Api.Contracts.Authetication.ForgotPassword;
using Booking.Api.Contracts.Authetication.Login;
using Booking.Api.Contracts.Authetication.Register;
using Booking.Application.Authentication.ConfirmEmail;
using Booking.Application.Authentication.ForgotPassword;
using Booking.Application.Authentication.Login;
using Booking.Application.Authentication.Register;
using Mapster;

namespace Booking.Api.Common.Mapping;

public class AuthenticationMappingConfig : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<(RegisterUserRequest registerRequest, string BaseUrl), RegisterUserCommand>()
		.Map(dest => dest.BaseUrl, src => src.BaseUrl)
		.Map(dest => dest, src => src.registerRequest);

		config.NewConfig<(RegisterRealtorRequest registerRequest, string BaseUrl, byte[] Image),
			RegisterRealtorCommand>()
		.Map(dest => dest.BaseUrl, src => src.BaseUrl)
		.Map(dest => dest.Avatar, src => src.Image)
		.Map(dest => dest, src => src.registerRequest);
		
		config.NewConfig<ConfirmEmailRequest, ConfirmEmailCommand>();

		config.NewConfig<LoginUserRequest, LoginUserQuery>();

		config.NewConfig<(ForgotPasswordRequest registerRequest, string BaseUrl), ForgotPasswordQuery>()
			.Map(dest => dest.BaseUrl, src => src.BaseUrl)
			.Map(dest => dest, src => src.registerRequest);

		config.NewConfig<LoginUserRequest, LoginUserQuery>();
	}
}

 
