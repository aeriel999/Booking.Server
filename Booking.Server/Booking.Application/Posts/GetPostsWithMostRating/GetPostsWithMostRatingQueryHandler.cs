using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostsWithMostRating;
public class GetPostsWithMostRatingQueryHandler(IPostRepository repository) : IRequestHandler<GetPostsWithMostRatingQuery, ErrorOr<List<Post>>>
{
    public async Task<ErrorOr<List<Post>>> Handle(GetPostsWithMostRatingQuery request, CancellationToken cancellationToken)
    {
        var posts = await repository.GetListOfPostWithMostRatingAsync();

        if (posts == null) return Error.NotFound("Posts are not found");

        return posts;
    }
}

