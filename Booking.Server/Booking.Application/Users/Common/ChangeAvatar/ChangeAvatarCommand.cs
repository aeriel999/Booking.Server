using ErrorOr;
using MediatR;
 

namespace Booking.Application.Users.Common.ChangeAvatar;

public record ChangeAvatarCommand(byte[] Avatar,  Guid UserId) : IRequest<ErrorOr<string>>;
 