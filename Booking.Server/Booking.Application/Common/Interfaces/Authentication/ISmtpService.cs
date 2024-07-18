namespace Booking.Application.Common.Interfaces.Authentication;

public interface ISmtpService
{
	Task SendEmailAsync(string toEmail, string subject, string body);

}

//using PostBooking.Domain.Users;
//using ErrorOr;

//namespace PostBooking.Application.Common.Interfaces.Authentication;

//public interface IUserAuthenticationService
//{
//	Task<ErrorOr<string>> LoginUserAsync(string email, string password);
//	Task<ErrorOr<Success>> LogoutUserAsync(string userId);

//	Task<string> GenerateEmailConfirmationTokenAsync(User user);

//	Task<ErrorOr<Success>> ConfirmEmailAsync(string userId, string token);
//}
