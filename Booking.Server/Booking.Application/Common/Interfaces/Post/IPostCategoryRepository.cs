using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostCategoryRepository
{
	Task<PostCategory?> FindPostCategoryByIdAsync(Guid postCategoryId);

	Task<List<PostCategory>?> GetListOfCategoriesAsync();

	Task<List<PostCategory>?> GetFilteredListOfCategoriesAsync(Guid? Country, Guid? City, Guid? Realtor);
}
