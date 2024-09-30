namespace Booking.Api.Contracts.Users.Common.DeleteUserByAdmin;

public record DeleteUserByAdminRequest
{
	public required Guid UserId { get; init; }
}
