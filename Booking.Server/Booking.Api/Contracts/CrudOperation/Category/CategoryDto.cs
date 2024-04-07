using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.CrudOperation.Category
{
    public class CategoryDto
    {
        [Required(ErrorMessage = "Property {Name} category must not be empty")]
        [Length(3, 30)]
        public required string Name { get; init; }
    }
}
