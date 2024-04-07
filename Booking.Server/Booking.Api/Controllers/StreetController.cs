using Booking.Api.Infrastructure;
using Booking.Application.Location.Country;
using Booking.Application.Location.Street;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StreetController(ISender mediatr, IMapper mapper): ApiController
    {
        [HttpGet("GetAllStrret")]
        public async Task<IActionResult> GetAll()
        {
            var list = await mediatr.Send(new StreetListCommand());
            return Ok(list);
        }
    }
}
