namespace Booking.Domain.Posts;
public class PostService
{
    public Guid ServiceId { get; set; }
    public Service? Service { get; set; }
    public Guid PostId { get; set; }
    public Post? Post { get; set; }
}

