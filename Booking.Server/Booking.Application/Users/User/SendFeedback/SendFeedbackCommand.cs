using Booking.Application.ForUsers.User.SendFeedback;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.User.SendFeedback;
public record SendFeedbackCommand(string Text, float Rating, Guid RealtorId, Guid ClientId):IRequest<ErrorOr<SendFeedbackCommandResult>>;

