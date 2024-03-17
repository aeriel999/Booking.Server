using Booking.Application.Common.Interfaces.Authentication;
using ErrorOr;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Booking.Application.Common.Services;

public class EmailService(ISmtpService smtpService)
{
	public async Task<ErrorOr<Success>> SendEmailConfirmationEmailAsync(
		Guid userId, string email, string token, string baseUrl)
	{
		var encodedEmailToken = Encoding.UTF8.GetBytes(token);

		var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

		//ToDo make EmailBody
		string url = $"{baseUrl}/authentication/confirm-email?userid={userId}&token={validEmailToken}";

		string body = string.Empty;

		using (StreamReader reader = new("./EmailTemplates/email-confirmation.html"))
		{
			body = reader.ReadToEnd();
		}


		string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";

		await smtpService.SendEmailAsync(email, "Email confirmation.", body);

		return Result.Success;
	}

	public async Task<ErrorOr<Success>> SendResetPasswordEmail(string email, string token, string baseUrl)
	{
		var encodedToken = Encoding.UTF8.GetBytes(token);

		var validToken = WebEncoders.Base64UrlEncode(encodedToken);

		string url = $"{baseUrl}/authentication/reset-password?email={email}&token={validToken}";

		string body = string.Empty;

		using (StreamReader reader = new("./EmailTemplates/email-confirmation.html"))
		{
			body = reader.ReadToEnd();
		}
		string emailBody = $"<p>To reset your password <a href='{url}'>Click here</a></p>";

		body = body.Replace("{{ name }}", email);
		 
		body = body.Replace("{{ code }}", emailBody);



		await smtpService.SendEmailAsync(email, "Reset password", body);

		return Result.Success;
	}

}
