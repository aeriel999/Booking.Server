using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Contracts.CrudOperation.Post
{   
    public class AddPostDto
    {      
        public string? NamePost { get; set; }        
        public Guid CategoryId { get; set; }        
        public string Description { get; set; }
        public TypeOfRent TypeOfRent { get; set; }       
        public Guid StreetId { get; set; }        
        public string? NumberOfBuilding { get; set; }
        public int? NumberOfRooms { get; set; }
        public int? Area { get; set; }        
        public Guid UserId { get; set; }        
        public int? NearlyСost { get; set; }
        [BindProperty(Name = "images[]")]
        public List<IFormFile>? Images { get; set; }
    }   
}
