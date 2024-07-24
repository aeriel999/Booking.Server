using Booking.Domain.Posts;

namespace Booking.Application.Common.Interfaces.Post;
public interface IPostPostTypeOfRestRepository
{
    Task Create(PostPostTypeOfRest postPostTypeOfRest);


	Task<List<PostPostTypeOfRest>?> GetListPostPostTypeOfRestAsync();
}
