namespace Booking.Api.Contracts.Post.GetArchivedPostListForRealtor;

public record GetArchivedPostListForRealtorResponse(
	Guid Id,
	string Category,
	//string TypeOfRent,
	string Adress,
	string Name,
	decimal Price,
	DateTime DateOfPost,
	DateTime? DateOfEdit,
	bool IsActive);
 
