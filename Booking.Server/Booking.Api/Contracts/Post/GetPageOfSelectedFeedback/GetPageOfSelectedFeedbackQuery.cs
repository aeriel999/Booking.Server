using ErrorOr;
using MediatR;

namespace Booking.Api.Contracts.Post.GetPageOfSelectedFeedback;
public record GetPageOfSelectedFeedbackQuery(Guid FeedbackId, Guid PostId):IRequest<ErrorOr<int>>;

