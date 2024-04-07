using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.CrudOperation.Town
{
    public class EditTownDto
    {
        [Required(ErrorMessage = "Property {NameTown} must not be empty")]
        [Length(3, 30)]
        public required string NameTown { get; init; }

        [Required(ErrorMessage = "Property {CountryId} must not be empty")]
        public required Guid CountryId { get; init; }
    }
}
