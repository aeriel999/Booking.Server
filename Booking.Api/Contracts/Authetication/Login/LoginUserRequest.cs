namespace Booking.Api.Contracts.Authetication.Login;

public record LoginUserRequest(
	string Email,
	string Password);
