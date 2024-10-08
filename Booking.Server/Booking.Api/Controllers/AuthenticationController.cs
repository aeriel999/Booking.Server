﻿using Booking.Api.Contracts.Authetication.ChangeEmail;
using Booking.Api.Contracts.Authetication.ConfirmEmail;
using Booking.Api.Contracts.Authetication.ForgotPassword;
using Booking.Api.Contracts.Authetication.Login;
using Booking.Api.Contracts.Authetication.ReconfirmEmail;
using Booking.Api.Contracts.Authetication.Register;
using Booking.Api.Contracts.Authetication.ResetPassword;
using Booking.Api.Infrastructure;
using Booking.Application.Authentication.ChangeEmail;
using Booking.Application.Authentication.CheckPasswordIsNotNull;
using Booking.Application.Authentication.ConfirmEmail;
using Booking.Application.Authentication.ForgotPassword;
using Booking.Application.Authentication.GoogleLogin;
using Booking.Application.Authentication.Login;
using Booking.Application.Authentication.Register;
using Booking.Application.Authentication.ResetPassword;
using Booking.Application.Authentication.SendConfirmationEmail;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(
	ISender mediatr, IMapper mapper, IConfiguration configuration)
	: ApiController
{
	[HttpPost("user-register")]
	public async Task<IActionResult> RegisterUserAsync(RegisterUserRequest request)
	{
		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

		var authResult = await mediatr.Send(mapper.Map<RegisterUserCommand>((request, baseUrl)));
		 
		return authResult.Match(
			authResult => Ok(),
			errors => Problem(errors));
	}


	[HttpPost("realtor-register")]
	public async Task<IActionResult> RegisterRealtorAsync(RegisterRealtorRequest request)
	{
		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

		var image = new byte[byte.MaxValue];

		if (request.Avatar != null && request.Avatar.Length != 0)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				await request.Avatar.CopyToAsync(memoryStream);

				image = memoryStream.ToArray();
			}
		}

		var authResult = await mediatr.Send(mapper.Map<RegisterRealtorCommand>((request, baseUrl, image)));

		return authResult.Match(
			authResult => Ok(),
			errors => Problem(errors));
	}


	[HttpPost("confirm-email")]
	public async Task<IActionResult> ConfirmEmailAsync(ConfirmEmailRequest request)
	{
		var confirmEmailResult = await mediatr.Send(mapper.Map<ConfirmEmailCommand>(request));

		return confirmEmailResult.Match(
			authResult => Ok(confirmEmailResult.Value),
			errors => Problem(errors));
	}


	[HttpPost("login")]
	public async Task<IActionResult> LoginAsync([FromBody] LoginUserRequest request)
	{
		var loginResult = await mediatr.Send(mapper.Map<LoginUserQuery>(request));

		return loginResult.Match(
			loginResult => Ok(loginResult),
			errors => Problem(errors));
	}


	[HttpPost("google-login")]
	public async Task<IActionResult> GoogleLoginAsync([FromBody] GoogleLoginUserRequest request)
	{
		var googleLoginResult = await mediatr.Send(mapper.Map<GoogleLoginUserCommand>(request));

		return googleLoginResult.Match(
			loginResult => Ok(googleLoginResult.Value),
			errors => Problem(errors));
	}


	[HttpPost("forgot-password")]
	public async Task<IActionResult> ForgotPasswordAsync([FromBody] ForgotPasswordRequest request)
	{
		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

		var forgotPasswordResult = await mediatr.Send(mapper.Map<ForgotPasswordQuery>((request, baseUrl)));

		return forgotPasswordResult.Match(
			forgotPasswordResult => Ok(forgotPasswordResult),
			errors => Problem(errors));
	}


	[HttpPost("reset-password")]
	public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPssswordRequest request)
	{
		var resetPasswordResult = await mediatr.Send(mapper.Map<ResetPasswordCommand>(request));

		return resetPasswordResult.Match(
			resetPasswordResult => Ok(resetPasswordResult),
			errors => Problem(errors));
	}


	[HttpPost("change-email")]
	public async Task<IActionResult> ChangeEmailAsync([FromBody] ChangeEmailRequest request)
	{
		var changeEmailResult = await mediatr.Send(mapper.Map<ChangeEmailCommand>(request));

		return changeEmailResult.Match(
			changeEmailResult => Ok(),
			errors => Problem(errors));
	}


	[HttpPost("reconfirm-email")]
	public async Task<IActionResult> ReconfirmEmailAsync(ReconfirmEmailRequest request)
	{
		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

		var changeEmailResult = await mediatr.Send(
			mapper.Map<SendConfirmationEmailCommand>((request, baseUrl)));

		return changeEmailResult.Match(
			changeEmailResult => Ok(),
			errors => Problem(errors));
	}


    [HttpGet("check-password-is-not-null")]
    public async Task<IActionResult>CheckPasswordIsNotNullAsync()
    {
        string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var checkPasswordIsNotNull = await mediatr.Send(new CheckPasswordIsNotNullQuery(Guid.Parse(userId)));

        return checkPasswordIsNotNull.Match(
            checkPasswordIsNotNull => Ok(checkPasswordIsNotNull),
            errors => Problem(errors));
    }
}
