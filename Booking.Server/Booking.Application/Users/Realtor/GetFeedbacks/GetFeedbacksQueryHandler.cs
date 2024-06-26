using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetFeedbacks;
public class GetFeedbacksQueryHandler(IUserFeedbackRepository repository) : IRequestHandler<GetFeedbacksQuery, ErrorOr<PagedList<Feedback>>>
{
    public async Task<ErrorOr<PagedList<Feedback>>> Handle(GetFeedbacksQuery request, CancellationToken cancellationToken)
    {
        var list = await repository.GetFeedbacksAsync(request.id, request.page, request.sizeOfPage);

        if (list == null) return Error.NotFound("List is empty");

        return list;
    }
}

