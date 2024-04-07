using Booking.Domain.Models;
using Booking.Domain.Users;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Api.Contracts.CrudOperation.Post
{
    public enum TypeOfRent { Погодинна = 0, Подобова = 1, Довгострокова = 2 }
    public class PostViewDto
    {
        public string NamePost { get; set; }        
        public Guid CategoryId { get; set; }
        public string? Description { get; set; }
        public TypeOfRent TypeOfRent { get; set; }        
        public Guid StreetId { get; set; }
        public string? NumberOfBuilding { get; set; }
        public int? NumberOfRooms { get; set; }
        public int? Area { get; set; }
        public Guid UserId { get; set; }
        public bool isArhive { get; set; }=false;
        public int? NearlyСost { get; set; }
        public ICollection<ImagesPostDto> ImagesPost { get; set; }
    }
}
