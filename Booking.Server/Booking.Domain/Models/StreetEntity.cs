using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Domain.Models
{
    public class StreetEntity
    {
        public Guid Id { get; set; }
        public string NameStreet { get; set; } = string.Empty;
        [ForeignKey("TownEntity")]
        public Guid TownId { get; set; }
        public TownEntity Town { get; set; }
    }
}
