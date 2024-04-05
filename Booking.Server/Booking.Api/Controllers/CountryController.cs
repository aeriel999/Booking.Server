using Booking.Api.Contracts.Authetication.ChangeEmail;
using Booking.Api.Contracts.Authetication.ConfirmEmail;
using Booking.Api.Contracts.Authetication.ForgotPassword;
using Booking.Api.Contracts.Authetication.Login;
using Booking.Api.Contracts.Authetication.Register;
using Booking.Api.Contracts.Authetication.ResetPassword;
using Booking.Api.Infrastructure;
using Booking.Application.Authentication.ChangeEmail;
using Booking.Application.Authentication.ConfirmEmail;
using Booking.Application.Authentication.ForgotPassword;
using Booking.Application.Authentication.Login;
using Booking.Application.Authentication.Register;
using Booking.Application.Authentication.ResetPassword;
using Booking.Application.Location.Country;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CountryController(ISender mediatr, IMapper mapper)
	: ApiController
{
	[HttpGet("list")]
    public async Task<IActionResult> List()
	{
		var list = await mediatr.Send(new CountryListCommand());
        return Ok(list);
	}
}
