namespace Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;

public interface IPostRepository
{
	Task CreatePostAsync(Post post);

	Task SavePostAsync();

	Task<Post?> GetPostByIdAsync(Guid postId);
}
