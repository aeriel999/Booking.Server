using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Common.Interfaces.Common;

public interface IImageStorageService
{
	Task<string> AddAvatarAsync(User user, byte[] file);

	Task<ErrorOr<string>> SaveImageAsync(IFormFile image);

	Task<ErrorOr<Deleted>> DeleteImageAsync(string imageName);
}
