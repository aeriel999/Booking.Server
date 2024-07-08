namespace Booking.Domain.Posts;

public class PostPostTypeOfRest
{
    public  PostTypeOfRest? PostTypeOfRest { get; set; }
    public Guid PostTypeOfRestId { get; set; }
    public  Post? Post { get; set; }
    public Guid PostId { get; set; }
}

