using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.CrudOperation.Country
{
    public class CountryDto
    {
        [Required(ErrorMessage = "Property {NameCountry} must not be empty")]
        [Length(3, 30)]
        public required string NameCountry { get; init; }
    }
}
