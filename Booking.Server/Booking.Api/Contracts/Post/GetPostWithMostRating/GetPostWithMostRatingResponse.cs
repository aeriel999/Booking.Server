namespace Booking.Api.Contracts.Post.GetPostWithMostRating;
public record GetPostWithMostRatingResponse(Guid Id, string Name, decimal Rating, string Country, string City);

