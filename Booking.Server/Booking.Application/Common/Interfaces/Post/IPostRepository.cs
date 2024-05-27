namespace Booking.Application.Common.Interfaces.Post;

using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;

public interface IPostRepository
{
	Task CreatePostAsync(Post post);

	Task SavePostAsync();

	Task<Post?> GetPostByIdAsync(Guid postId);
	Task<PagedList<Post>> GetAllAsync(int page, int sizeOfPage);
	Task<PagedList<Post>> GetFilteredListAsync(string type, int page, int sizeOfPage, Guid id);
	Task<PagedList<Post>> GetPostByNameAsync(string name, int page, int sizeOfPage);
	Task<List<string>> GetNameOfPostAsync(string name);
}
