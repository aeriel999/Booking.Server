using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Domain.Models
{
    public class ImagesPostEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string NameImage { get; set; }
        public int PriorityImage { get; set; }
        [ForeignKey("PostEntity")]
        public Guid PostId { get; set; }
        public PostEntity Post { get; set; }
    }
}
