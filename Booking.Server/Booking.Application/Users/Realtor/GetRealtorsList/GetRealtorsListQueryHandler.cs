using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsList;
public class GetRealtorsListQueryHandler(IUserRepository repository) : IRequestHandler<GetRealtorsListQuery, ErrorOr<List<Booking.Domain.Users.User>>>
{
    public async Task<ErrorOr<List<Booking.Domain.Users.User>>> Handle(GetRealtorsListQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.GetRealtorsAsync();

        if (response == null) return Error.NotFound("List not found");

        return response;
    }
}

