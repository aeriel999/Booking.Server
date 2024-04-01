using Booking.Api.Contracts.Authetication.Register;
using Booking.Api.Infrastructure;
using Booking.Application.Authentication.Register;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UserController(
	ISender mediatr, IMapper mapper, IConfiguration configuration)
	: ApiController
{
	[HttpPost("realtor-profile")]
	public async Task<IActionResult> EditRealtorPrifileInfoAsync(EditRealtorPrifileInfoRequest request)
	{
		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

		var authResult = await mediatr.Send(mapper.Map<RegisterUserCommand>((request, baseUrl)));

		return authResult.Match(
			authResult => Ok(),
			errors => Problem(errors));
	}
}
