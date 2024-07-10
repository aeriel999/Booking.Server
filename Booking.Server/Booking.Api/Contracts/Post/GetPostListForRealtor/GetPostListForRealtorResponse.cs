namespace Booking.Api.Contracts.Post.GetPostListForRealtor;

public record GetPostListForRealtorResponse(
	Guid Id,
	string Category,
	string Adress,
	string Name,
	decimal Price,
	DateTime DateOfPost,
	DateTime? DateOfEdit,
	bool IsActive,
	bool IsArhive,
	float Rate,
	int? Discount);
 
