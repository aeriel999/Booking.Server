namespace Booking.Application.Common.Interfaces.Post;

using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;

public interface IPostRepository
{
	Task CreatePostAsync(Post post);

	Task SavePostAsync();

	Task<Post?> GetPostByIdAsync(Guid postId);
	Task<PagedList<Post>> GetAllAsync(int page, int sizeOfPage);
}
