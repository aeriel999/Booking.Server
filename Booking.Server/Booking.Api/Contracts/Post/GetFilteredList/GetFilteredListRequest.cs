namespace Booking.Api.Contracts.Post.GetFilteredList;
public record GetFilteredListRequest
{
    public Guid? category { get; set; }

    public Guid? country { get; set; }

    public Guid? city { get; set; }

    public Guid? realtor { get; set; }
}
