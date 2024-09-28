namespace Booking.Api.Contracts.Users.User.GetListOfAllUsersForAdmin;

public record  GetListOfAllUsersForAdminResponse
{
    public required Guid Id { get; init; }


	public required string Name { get; init; }


	public required string Email { get; init; }


	public required bool IsActive { get; init; }
}
 