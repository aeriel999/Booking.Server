using Booking.Domain.Posts;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Post;
public interface IPostServiceRepository
{
    Task CreatePostServiceListAsync(List<PostService> postService);


	ErrorOr<PostService> GetPostServiceById(Guid service, Guid postId);


	Task DeletePostServiceListAsync(List<PostService> postService);
}

