using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Domain.Models
{
    public class TownEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string? NameTown { get; set; }
        [ForeignKey("CountryEntity")]
        public Guid CountryId { get; set; }
        public CountryEntity Country { get; set; }
    }
}
