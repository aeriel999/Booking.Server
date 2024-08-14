using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsList;
public class GetRealtorsListQueryHandler(IUserRepository repository) : IRequestHandler<GetRealtorsListQuery, ErrorOr<List<User>>>
{
    public async Task<ErrorOr<List<User>>> Handle(GetRealtorsListQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.GetRealtorsListAsync();

        if (response == null) return Error.NotFound("List not found");

        return response;
    }
}

