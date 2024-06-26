using Booking.Domain.Users;

namespace Booking.Application.Common.Interfaces.Common;

public interface IImageStorageService
{
	Task<string> AddAvatarAsync(User user, byte[] file);


	Task<string> SavePostImageInStorageAsync(byte[] file);


	Task DeleteImageAsync(string imageName, string path);
}
