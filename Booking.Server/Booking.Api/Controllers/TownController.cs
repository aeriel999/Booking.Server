using Booking.Api.Contracts.CrudOperation.Town;
using Booking.Api.Infrastructure;
using Booking.Application.Location.Country;
using Booking.Application.Location.Town;
using Booking.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TownController(ISender mediatr, IMapper mapper) :ApiController
    {

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIdTown(Guid id)
        {
            var town = await mediatr.Send(new GetTownByIdCommand(id));

            if (town == null)
            {
                return NotFound(); 
            }

            return Ok(town);
        }

        [HttpGet("GetAllTowns")]
        public async Task<IActionResult> GetAllTowns()
        {
            var list = await mediatr.Send(new TownListCommand());
            return Ok(list);
        }

        [HttpPost("AddNewTown")]
        public async Task<IActionResult> AddNewTown([FromForm] AddTownDto dtoTown)
        {
            var value =mapper.Map<TownEntity>(dtoTown);

            await mediatr.Send(new AddTownCommand(value));
            return Ok();
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteTown([FromForm] Guid id)
        {
            await mediatr.Send(new DeleteTownCommand(id));
            return Ok();
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> EditTown([FromForm] EditTownDto editTownDto)
        {
            var value = mapper.Map<TownEntity>(editTownDto);

            await mediatr.Send(new EditCategoryCommand(value));
            return Ok();
        }
    }
}
