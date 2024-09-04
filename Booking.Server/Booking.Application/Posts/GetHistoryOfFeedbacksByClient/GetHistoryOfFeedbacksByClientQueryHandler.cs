using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Posts.GetFeedbacksByClient;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetHistoryOfFeedbacksByClient;
public class GetHistoryOfFeedbacksByClientQueryHandler(IPostFeedbackRepository repository) : IRequestHandler<GetHistoryOfFeedbacksByClientQuery, ErrorOr<PagedList<Feedback>>>
{
    public async Task<ErrorOr<PagedList<Feedback>>> Handle(GetHistoryOfFeedbacksByClientQuery request, CancellationToken cancellationToken)
    {
        var list = await repository.GetHistoryOfFeedbacksByUserAsync(request.ClientId);

        if (list == null) return Error.NotFound("List is empty");

        var pagedList = PagedList<Feedback>.getPagedList(list, request.Page, request.SizeOfPage);

        return pagedList!;
    }
}

