using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostImageRepository
{
	Task CraetePostImageAsync(PostImage image);

	Task SavePostImageAsync();
}
