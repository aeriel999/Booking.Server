namespace Booking.Application.Posts.GetPostListForRealtor;

public record GetPostListForRealtorQueryResult(
	Guid Id,
	string Category,
	string TypeOfRent,
	string Adress,
	string Name,
	decimal Price,
	DateTime DateOfPost,
	DateTime? DateOfEdit,
	bool IsActive,
	bool IsArhive);


