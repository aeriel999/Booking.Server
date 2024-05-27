namespace Booking.Application.Common.Interfaces.Post;

using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;

public interface IPostRepository
{
	Task CreatePostAsync(Post post);

	Task SavePostAsync();

	Task<Post?> GetPostByIdAsync(Guid postId);
	Task<PagedList<Post>> GetAllAsync(int page, int sizeOfPage);
	Task<PagedList<Post>> GetSortedListByNumberOfRoomsAsync(int page, int sizeOfPage);
	Task<PagedList<Post>> GetSortedListByPriceAsync(int page, int sizeOfPage);
	Task<PagedList<Post>> GetSortedListByCategoryAsync(int page, int sizeOfPage);
	Task<PagedList<Post>> GetSortedListByRealtorAsync(int page, int sizeOfPage);
}
