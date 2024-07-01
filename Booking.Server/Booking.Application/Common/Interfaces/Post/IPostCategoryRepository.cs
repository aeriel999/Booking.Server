using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostCategoryRepository
{
	Task<PostCategory?> FindPostCategoryByIdAsync(Guid postCategoryId);


	Task<List<PostCategory>?> GetListOfCategoriesAsync();
}
