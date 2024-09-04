using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorById;
public class GetRealtorByIdQueryHandler(IUserRepository repository) : IRequestHandler<GetRealtorByIdQuery, ErrorOr<Booking.Domain.Users.User>>
{
    public async Task<ErrorOr<Booking.Domain.Users.User>> Handle(GetRealtorByIdQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.GetUserByIdAsync(request.Id);

        if (response.IsError) return response.FirstError;

        return response;
    }
}


