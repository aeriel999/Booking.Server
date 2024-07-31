namespace Booking.Api.Contracts.Post.GetPostWithMostDiscount;
public record GetPostWithMostDiscountResponse(Guid Id, string Name, decimal Rating, string Image, string Country, string City, int Discount);

