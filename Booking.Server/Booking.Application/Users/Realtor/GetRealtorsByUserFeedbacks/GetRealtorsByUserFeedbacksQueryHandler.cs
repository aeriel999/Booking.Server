using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsByUserFeedbacks;
public class GetRealtorsByUserFeedbacksQueryHandler(IUserFeedbackRepository repository) : IRequestHandler<GetRealtorsByUserFeedbacksQuery, ErrorOr<List<Booking.Domain.Users.User>>>
{
    public async Task<ErrorOr<List<Booking.Domain.Users.User>>> Handle(GetRealtorsByUserFeedbacksQuery request, CancellationToken cancellationToken)
    {
       return await repository.GetRealtorsByUserFeedbacksAsync(request.Id);
    }
}

