using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Common.ChangeProfileHeader;

public record ChangeProfileHeaderCommand(byte[] ProfileHeaderImage, Guid UserId) 
	: IRequest<ErrorOr<string>>;

