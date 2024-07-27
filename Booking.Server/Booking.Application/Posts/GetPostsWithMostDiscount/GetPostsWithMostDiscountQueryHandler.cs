using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostsWithMostDiscount;
public class GetPostsWithMostDiscountQueryHandler(IPostRepository repository) : IRequestHandler<GetPostsWithMostDiscountQuery, ErrorOr<List<Post>>>
{
    public async Task<ErrorOr<List<Post>>> Handle(GetPostsWithMostDiscountQuery request, CancellationToken cancellationToken)
    {
        var posts = await repository.GetListOfPostWithMostDiscountAsync();

        if (posts == null) return Error.NotFound("Posts are not found");

        return posts;
    }
}

