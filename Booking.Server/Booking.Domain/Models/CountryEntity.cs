using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Domain.Models
{
    public class CountryEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string? NameCountry { get; set; }        
    }
}
