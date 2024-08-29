using Booking.Domain.Posts;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Post;
public interface IPostPostTypeOfRestRepository
{
    Task CreatePostPostTypeOfRestListAsync(List<PostPostTypeOfRest> postPostTypeOfRest);


	ErrorOr<PostPostTypeOfRest> GetPostTypeOfRestById(Guid typeId, Guid postId);


	Task DeletePostPostTypeOfRestListAsync(List<PostPostTypeOfRest> postPostTypeOfRest);
}
