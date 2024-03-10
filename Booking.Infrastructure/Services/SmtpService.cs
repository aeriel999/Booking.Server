using Booking.Application.Common.Interfaces.Authentication;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;

namespace Booking.Infrastructure.Services;

public class SmtpService(IConfiguration configuration) : ISmtpService
{
    //ToDo If in sending email throw an error and email didnt send but uaer is creating 
    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        string fromEmail = configuration["EmailSettings:User"]!;
        string SMTP = configuration["EmailSettings:SMTP"]!;
        int port = int.Parse(configuration["EmailSettings:port"]!);
        string password = configuration["EmailSettings:Password"]!;

        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(fromEmail));
        email.To.Add(MailboxAddress.Parse(toEmail));
        email.Subject = subject;

        var bodyBuilder = new BodyBuilder();
        bodyBuilder.HtmlBody = body;
        email.Body = bodyBuilder.ToMessageBody();

        using (var smtp = new SmtpClient())
        {
            smtp.Connect(SMTP, port, SecureSocketOptions.SslOnConnect);
            smtp.Authenticate(fromEmail, password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
