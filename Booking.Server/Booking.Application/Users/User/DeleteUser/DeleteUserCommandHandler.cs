using Booking.Application.Common.Interfaces.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.User.DeleteUser;
public class DeleteUserCommandHandler(IUserRepository userRepository,IUserFeedbackRepository userFeedbackRepository) : IRequestHandler<DeleteUserCommand, ErrorOr<Deleted>>
{
    public async Task<ErrorOr<Deleted>> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        await userFeedbackRepository.DeleteAllFeedbacksAsync(request.id);

        var result = await userRepository.DeleteUserAsync(request.id);
        if (result.IsError) return Error.Custom((int)result.Errors.FirstOrDefault().Type,
            result.Errors.FirstOrDefault().Code,
            result.Errors.FirstOrDefault().Description);

        return Result.Deleted;
    }
}

