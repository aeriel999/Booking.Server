using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostByName;

public class GetPostByNameQueryHandler(IPostRepository repository) : IRequestHandler<GetPostByNameQuery, ErrorOr<Guid>>
{
    public async Task<ErrorOr<Guid>> Handle(GetPostByNameQuery request, CancellationToken cancellationToken)
    {
        Guid postId = await repository.GetPostByNameAsync(request.Category,request.Country,request.City,request.Realtor,request.Name);

        if (postId == Guid.Empty) return Error.NotFound("Post is not found");

        //var response = PagedList<Post>.getPagedList(posts, request.Page, request.SizeOfPage);

        return postId;
    }
}

