namespace Booking.Application.Common.Interfaces.Post;

using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;

public interface IPostRepository
{
	Task CreatePostAsync(Post post);

	Task SavePostAsync();

	Task<List<Post>> GetPostListByRealtorIdAsync(Guid realtorId);

	Task<Post?> GetPostByIdAsync(Guid postId);

	Task<PagedList<Post>> GetAllAsync(int page, int sizeOfPage);
	Task<PagedList<Post>> GetFilteredListAsync(Guid? category, Guid? country, Guid? city, Guid? realtor, int page, int sizeOfPage);
	Task<PagedList<Post>> GetPostByNameAsync(Guid? category, Guid? country, Guid? city, Guid? realtor, string name, int page, int sizeOfPage);

	Task<List<string>> GetNameOfPostAsync(Guid? category, Guid? country, Guid? city, Guid? realtor, string name);

	Task<List<Post>?> GetListPostByRealtorIdAsync(Guid realtorId);

}
