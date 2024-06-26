namespace Booking.Application.Posts.GetArchivedPostList;

public record GetArchivedPostListForRealtorQueryResult(
	Guid Id,
	string Category,
	string TypeOfRent,
	string Adress,
	string Name,
	decimal Price,
	DateTime DateOfPost,
	DateTime? DateOfEdit,
	bool IsActive);
