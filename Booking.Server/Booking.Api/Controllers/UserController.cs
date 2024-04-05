using Booking.Api.Contracts.Users.Common.ChangePassword;
using Booking.Api.Contracts.Users.Realtor.Edit;
using Booking.Api.Infrastructure;
using Booking.Application.Users.Common.ChangePassword;
using Booking.Application.Users.Realtor;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UserController(ISender mediatr, IMapper mapper, IConfiguration configuration) : ApiController
{
	[HttpPost("realtor-profile")]
	public async Task<IActionResult> EditRealtorPrifileInfoAsync(EditRealtorPrifileInfoRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

		var image = new byte[request.Avatar == null ? 0 : request.Avatar.Length];

		if (request.Avatar != null && request.Avatar.Length != 0)
		{
			using MemoryStream memoryStream = new MemoryStream();
			await request.Avatar.CopyToAsync(memoryStream);

			image = memoryStream.ToArray();
		}

		var editResult = await mediatr.Send(
			mapper.Map<EditRealtorPrifileInfoCommand>((request, userId, baseUrl, image)));

		return editResult.Match(
			authResult => Ok(mapper.Map<EditRealtorPrifileInfoResponse>(editResult.Value)),
			errors => Problem(errors));
	}

	[HttpPost("change-password")]
	public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var changeEmailResult = await mediatr.Send(mapper.Map<ChangePasswordCommand>((request, userId)));

		return changeEmailResult.Match(
			changeEmailResult => Ok(),
			errors => Problem(errors));
	}
}
