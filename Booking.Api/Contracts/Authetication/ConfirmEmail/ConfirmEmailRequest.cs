namespace Booking.Api.Contracts.Authetication.ConfirmEmail;

public record ConfirmEmailRequest(string UserId, string Token);
