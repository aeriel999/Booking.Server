using Booking.Application.Common.Interfaces.Post;
using ErrorOr;
using MediatR;

namespace Booking.Api.Contracts.Post.GetPageOfSelectedFeedback;
public class GetPageOfSelectedFeedbackQueryHandler(IPostFeedbackRepository repository) : IRequestHandler<GetPageOfSelectedFeedbackQuery, ErrorOr<int>>
{
    public async Task<ErrorOr<int>> Handle(GetPageOfSelectedFeedbackQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.GetPageOfSelectedFeedbackAsync(request.FeedbackId, request.PostId);

        if (response == null) return Error.NotFound("Feedback is not found");

        return response.Value;
    }
}

