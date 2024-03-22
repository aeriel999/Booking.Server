using Booking.Application.Common.Interfaces.Authentication;
using ErrorOr;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Booking.Application.Common.Services;

public class EmailService(ISmtpService smtpService)
{
	public async Task<ErrorOr<Success>> SendEmailConfirmationEmailAsync(
		Guid userId, string email, string token, string baseUrl, string userName)
	{
		var encodedEmailToken = Encoding.UTF8.GetBytes(token);

		var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

		string url = $"{baseUrl}/authentication/confirm-email?userid={userId}&token={validEmailToken}";

		string confirmationUrl = $" <a href='{url}'>Confirm now</a>";

		string emailBody = string.Empty;

		using (StreamReader reader = new("./EmailTemplates/email-confirmation.html"))
		{
			emailBody = reader.ReadToEnd();
		}

		emailBody = emailBody.Replace("{{ name }}", userName);

		emailBody = emailBody.Replace("{{ code }}", confirmationUrl);

		await smtpService.SendEmailAsync(email, "Email confirmation.", emailBody);

		return Result.Success;
	}

	public async Task<ErrorOr<Success>> SendResetPasswordEmail(
		string email, string token, string baseUrl, string userName)
	{
		var encodedToken = Encoding.UTF8.GetBytes(token);

		var validToken = WebEncoders.Base64UrlEncode(encodedToken);

		string url = $"{baseUrl}/authentication/reset-password?email={email}&token={validToken}";

		string emailBody = string.Empty;

		using (StreamReader reader = new("./EmailTemplates/forgot-password.html"))
		{
			emailBody = reader.ReadToEnd();
		}

		emailBody = emailBody.Replace("{{ name }}", userName);

		emailBody = emailBody.Replace("{{ url }}", url);

		await smtpService.SendEmailAsync(email, "Reset password", emailBody);

		return Result.Success;
	}

}
