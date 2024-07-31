using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Client.SendFeedback;
public record SendFeedbackCommand(string Text, float Rating, Guid RealtorId, Guid ClientId) : IRequest<ErrorOr<SendFeedbackCommandResult>>;

