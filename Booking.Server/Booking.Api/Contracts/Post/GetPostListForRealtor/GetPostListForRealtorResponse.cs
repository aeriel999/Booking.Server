namespace Booking.Api.Contracts.Post.GetPostListForRealtor;

public record GetPostListForRealtorResponse(
	Guid Id,
	string Category,
	string Adress,
	string Name,
	decimal Price,
	bool IsActive,
	bool IsArhive,
	int? Discount);
 
