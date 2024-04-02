using Booking.Domain.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Domain.Models
{
    public enum TypeOfRent { Погодинна=0, Подобова=1, Довгострокова=2 }
    public class PostEntity
    {
        public Guid Id { get; set; }
        public string? NamePost { get; set; }
        [ForeignKey("Category")]
        public Guid CategoryId { get; set; }
        public CategoryEntity Category { get; set; }
        public string? Description { get; set; }
        public TypeOfRent TypeOfRent { get; set; }
        [ForeignKey("CountryEntity")]
        public Guid CountryId { get; set; }
        public CountryEntity Country { get; set; }
        [ForeignKey("TownEntity")]
        public Guid TownId { get; set; }
        public TownEntity Town { get; set; }
        [ForeignKey("StreetEntity")]
        public Guid StreetId { get; set; }
        public StreetEntity Street { get; set; }
        public string? NumberOfBuilding { get; set; }
        public int? NumberOfRooms { get; set; }
        public int? Area { get; set; }        
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public User User { get; set; }
        public bool isArhive { get; set; }
        public int? NearlyСost { get; set; }
        public ICollection<ImagesPostEntity> ImagesPost { get; set; }
    }
}
