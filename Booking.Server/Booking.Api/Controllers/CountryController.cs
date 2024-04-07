using Booking.Api.Infrastructure;
using Booking.Application.Location.Country;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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
