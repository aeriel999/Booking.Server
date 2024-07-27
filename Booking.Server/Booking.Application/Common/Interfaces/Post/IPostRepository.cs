namespace Booking.Application.Common.Interfaces.Post;

using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;

public interface IPostRepository
{
	Task CreatePostAsync(Post post);


	Task UpdatePostAsync(Post post);


	Task SavePostAsync();


	Task DeletePostAsync(Post post);


	Task<Post?> GetPostById(Guid postId);


	Task<List<Post>> GetPostListWithIncludesByRealtorIdAsync(Guid realtorId);


	Task<Post?> GetPostWithIncludesByIdAsync(Guid postId);


	Task<List<Post>> GetAllAsync();


    Task<List<Post>> GetIncludeListNotArchivedAsync();



	Task<List<Post>> GetFilteredListAsync(Guid? category, Guid? country, Guid? city, Guid? realtor);



	Task<List<Post>> GetPostByNameAsync(Guid? category, Guid? country, Guid? city, Guid? realtor, string name);



    Task<List<string>> GetNameOfPostAsync(Guid? category, Guid? country, Guid? city, Guid? realtor, string name);


	Task<List<Post>?> GetListPostByRealtorIdAsync(Guid realtorId);


	Task<List<Post>?> GetArchivedListPostByRealtorIdAsync(Guid realtorId);

	Task<List<Post>> GetListOfPostWithMostRatingAsync();

	Task<List<Post>> GetListOfPostWithMostDiscountAsync();
}
