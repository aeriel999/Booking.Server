using Booking.Domain.Users;

namespace Booking.Application.Common.Interfaces.Common;

public interface IImageStorageService
{
	Task<string> AddAvatarAsync(User user, byte[] file);

	Task<string> SavePostImageAsync(byte[] file);

	//Task<ErrorOr<Deleted>> DeleteImageAsync(string imageName);
}
