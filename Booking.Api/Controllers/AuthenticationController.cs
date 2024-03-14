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
using System.IO;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(
	ISender mediatr, IMapper mapper, IHttpContextAccessor httpContext, IConfiguration configuration)
	: ApiController
{
	[HttpPost("user-register")]
	public async Task<IActionResult> RegisterUserAsync(RegisterUserRequest request)
	{
		//var baseUrl = httpContext.HttpContext!.Request.Host.Value;

		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL");

		var authResult = await mediatr.Send(mapper.Map<RegisterUserCommand>((request, baseUrl)));

		return authResult.Match(
			authResult => Ok(),
			errors => Problem(errors));
	}

	[HttpPost("realtor-register")]
	public async Task<IActionResult> RegisterRealtorAsync(RegisterRealtorRequest request)
	{
		var baseUrl = httpContext.HttpContext!.Request.Host.Value;

		//var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL");

		var image = new byte[byte.MaxValue];

		if (request.Avatar != null && request.Avatar.Length != 0)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				// Copy the contents of the file to the memory stream
				await request.Avatar.CopyToAsync(memoryStream);

				// Return the byte array representation of the memory stream's buffer
				image = memoryStream.ToArray();
			}
		}

		var authResult = await mediatr.Send(mapper.Map<RegisterRealtorCommand>((request, baseUrl, image)));

		return authResult.Match(
			authResult => Ok(),
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
