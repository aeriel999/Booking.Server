namespace Booking.Api.Contracts.Users.Common.UnBlockUserByAdmin;

public record DeleteUserByAdminRequest
{
	public required Guid UserId { get; init; }
}
