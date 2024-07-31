using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFeedbacks;
public class GetFeedbacksQueryHandler(IPostFeedbackRepository repository) : IRequestHandler<GetFeedbacksQuery, ErrorOr<PagedList<Feedback>>>
{
    public async Task<ErrorOr<PagedList<Feedback>>> Handle(GetFeedbacksQuery request, CancellationToken cancellationToken)
    {
        var list = await repository.GetFeedbacksAsync(request.Id, request.Page, request.SizeOfPage);

        if (list == null) return Error.NotFound("List is empty");

        return list;
    }
}

