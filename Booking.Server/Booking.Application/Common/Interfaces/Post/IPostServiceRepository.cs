using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;
public interface IPostServiceRepository
{
    Task Create(PostService postService);
}

