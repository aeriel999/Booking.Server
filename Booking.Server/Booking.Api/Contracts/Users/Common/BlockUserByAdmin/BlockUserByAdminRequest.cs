namespace Booking.Api.Contracts.Users.Common.BlockUserByAdmin;

public record BlockUserByAdminRequest
{
	public required Guid UserId { get; init; }
}
