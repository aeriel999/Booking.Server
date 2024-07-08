namespace Booking.Domain.Posts;
public class PostTypeOfRest
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public ICollection<PostPostTypeOfRest>? PostPostTypesOfRest { get; set; }
}

