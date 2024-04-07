using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Api.Contracts.CrudOperation.Street
{
    public class StreetDto
    {
        [Required(ErrorMessage = "Property {NameStreet} must not be empty")]
        [Length(3, 30)]
        public string NameStreet { get; init; }

        [Required(ErrorMessage = "Property {Id Town} must not be empty")]    
        public Guid TownId { get; init; }
    }
}
