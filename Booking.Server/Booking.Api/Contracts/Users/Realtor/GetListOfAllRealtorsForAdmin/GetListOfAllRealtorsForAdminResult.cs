namespace Booking.Api.Contracts.Users.Realtor.GetListOfAllRealtorsForAdmin;

public record GetListOfAllRealtorsForAdminResult
{
	public required Guid Id { get; init; }


	public required string Name { get; init; }


	public required string Email { get; init; }


	public required bool IsEmailConfirmed { get; init; }


	public required string PhoneNumber { get; init; }


	public required float Rate { get; init; }


	public required bool IsActive { get; init; }
}
