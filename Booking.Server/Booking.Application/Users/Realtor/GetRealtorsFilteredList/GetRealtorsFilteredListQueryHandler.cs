using Booking.Application.Common.Interfaces.Users;
using Booking.Application.Users.Realtor.GetRealtorsList;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsFilteredList;
public class GetRealtorsFilteredListQueryHandler(IUserRepository repository) : IRequestHandler<GetRealtorsFilteredListQuery, ErrorOr<List<User>>>
{
    public async Task<ErrorOr<List<User>>> Handle(GetRealtorsFilteredListQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.GetRealtorsFilteredListAsync(request.Category, request.Country, request.City);

        if (response == null) return Error.NotFound("List not found");

        return response;
    }
}

