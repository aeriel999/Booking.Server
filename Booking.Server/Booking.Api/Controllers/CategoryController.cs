using Booking.Api.Contracts.CrudOperation.Category;
using Booking.Api.Infrastructure;
using Booking.Application.Location.Category;
using Booking.Application.Location.Town;
using Booking.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(ISender mediatr, IMapper mapper)
    : ApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIdCategory(Guid id)
        {
            var category = await mediatr.Send(new GetCategoryByIdCommand(id));

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory()
        {
            var list = await mediatr.Send(new CategoryListCommand());
            return Ok(list);
        }

        [HttpPost("AddNewCategory")]
        public async Task<IActionResult> AddNewCategory([FromForm] CategoryDto dtoCategory)
        {
            var value = mapper.Map<CategoryEntity>(dtoCategory);

            await mediatr.Send(new AddCategoryCommand(value));
            return Ok();
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteCategory([FromForm] Guid id)
        {
            await mediatr.Send(new DeleteCategoryCommand(id));
            return Ok();
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> EditCategory([FromForm] CategoryDto dtoCategory)
        {
            var value = mapper.Map<CategoryEntity>(dtoCategory);

            await mediatr.Send(new Application.Location.Category.EditCategoryCommand(value));
            return Ok();
        }
    }
}
