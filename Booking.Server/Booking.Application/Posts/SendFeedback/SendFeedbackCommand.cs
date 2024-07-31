using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.SendFeedback;
public record SendFeedbackCommand(string Text, float Rating, Guid PostId, Guid ClientId) : IRequest<ErrorOr<SendFeedbackCommandResult>>;

