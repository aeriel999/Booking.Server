using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Authentication.CheckPasswordIsNotNull;
public class CheckPasswordIsNotNullQueryHandler(IUserRepository repository) : IRequestHandler<CheckPasswordIsNotNullQuery, ErrorOr<bool>>
{
    public async Task<ErrorOr<bool>> Handle(CheckPasswordIsNotNullQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.IsPasswordAsync(request.UserId);

        if(response.IsError) return response.Errors.FirstOrDefault();

        return response;
    }
}

