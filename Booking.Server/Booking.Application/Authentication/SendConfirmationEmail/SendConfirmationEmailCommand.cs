using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.SendConfirmationEmail;

public record SendConfirmationEmailCommand(string Email, string BaseUrl) : IRequest<ErrorOr<Success>>;
