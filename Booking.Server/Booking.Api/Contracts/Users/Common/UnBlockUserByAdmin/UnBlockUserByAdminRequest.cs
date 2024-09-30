namespace Booking.Api.Contracts.Users.Common.UnBlockUserByAdmin;

public class UnBlockUserByAdminRequest
{
	public required Guid UserId { get; init; }
}
