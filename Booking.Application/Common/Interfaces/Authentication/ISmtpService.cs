using Booking.Domain.Users;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Authentication;

public interface ISmtpService
{
	Task SendEmailAsync(string toEmail, string subject, string body);

}

//using Booking.Domain.Users;
//using ErrorOr;

//namespace Booking.Application.Common.Interfaces.Authentication;

//public interface IUserAuthenticationService
//{
//	Task<ErrorOr<string>> LoginUserAsync(string email, string password);
//	Task<ErrorOr<Success>> LogoutUserAsync(string userId);

//	Task<string> GenerateEmailConfirmationTokenAsync(User user);

//	Task<ErrorOr<Success>> ConfirmEmailAsync(string userId, string token);
//}

