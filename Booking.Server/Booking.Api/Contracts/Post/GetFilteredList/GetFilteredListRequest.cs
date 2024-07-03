namespace Booking.Api.Contracts.Post.GetFilteredList;
public record GetFilteredListRequest
{
    public Guid? Category { get; set; }

    public Guid? Country { get; set; }

    public Guid? City { get; set; }

    public Guid? Realtor { get; set; }
}
