using Booking.Application.Common.Interfaces.Authentication;
using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Booking.Application.Common.Services;

public class EmailService(ISmtpService smtpService)
{
	public async Task<ErrorOr<Success>> SendEmailConfirmationEmailAsync(Guid userId, string email, string token, string baseUrl)
	{
		var encodedEmailToken = Encoding.UTF8.GetBytes(token);

		var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

		//ToDo make EmailBody
		string url = $"{baseUrl}/authentication/confirm-email?userid={userId}&token={validEmailToken}";

		string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";

		await smtpService.SendEmailAsync(email, "Email confirmation.", emailBody);

		return Result.Success;
	}

	public async Task<ErrorOr<Success>> SendResetPasswordEmail()
	{
		return Result.Success;

	}

}
