using Booking.Api.Contracts.Authetication.ConfirmEmail;
using Booking.Api.Contracts.Authetication.Login;
using Booking.Api.Contracts.Authetication.Register;
using Booking.Api.Infrastructure;
using Booking.Application.Authentication.ConfirmEmail;
using Booking.Application.Authentication.Login;
using Booking.Application.Authentication.Register;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(ISender mediatr, IMapper mapper, IHttpContextAccessor httpContext)
	: ApiController
{
	[HttpPost("user-register")]
	public async Task<IActionResult> RegisterUserAsync(RegisterUserRequest request)
	{
		var baseUrl = httpContext.HttpContext!.Request.Host.Value;

		var authResult = await mediatr.Send(mapper.Map<RegisterUserCommand>((request, baseUrl)));

		return authResult.Match(
			authResult => Ok(authResult),
			errors => Problem(errors));
	}

	[HttpGet("confirm-email")]
	public async Task<IActionResult> ConfirmEmailAsync([FromQuery] ConfirmEmailRequest request)
	{
		var confirmEmailResult = await mediatr.Send(mapper.Map<ConfirmEmailCommand>(request));

		return confirmEmailResult.Match(
			authResult => Ok(confirmEmailResult),
			errors => Problem(errors[0].ToString()));
	}

	[HttpPost("login")]
	public async Task<IActionResult> LoginUserAsync([FromBody] LoginUserRequest request)
	{
		var loginResult = await mediatr.Send(mapper.Map<LoginUserQuery>(request));

		//return loginResult.Match(
		//	loginResult => Ok(mapper.Map<LoginUserResponse>(loginResult)),
		//	errors => Problem(errors[0].ToString()));

		return Ok();
	}
}
