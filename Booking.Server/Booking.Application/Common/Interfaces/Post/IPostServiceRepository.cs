using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;
public interface IPostServiceRepository
{
    Task CreatePostServiceAsync(PostService postService);
}

