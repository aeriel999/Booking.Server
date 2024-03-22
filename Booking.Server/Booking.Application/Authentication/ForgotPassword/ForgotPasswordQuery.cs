using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.ForgotPassword;

public record ForgotPasswordQuery(string Email, string BaseUrl) : IRequest<ErrorOr<Success>>;
