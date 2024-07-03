using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostByName;

public class GetPostByNameQueryHandler(IPostRepository repository) : IRequestHandler<GetPostByNameQuery, ErrorOr<PagedList<Post>>>
{
    public async Task<ErrorOr<PagedList<Post>>> Handle(GetPostByNameQuery request, CancellationToken cancellationToken)
    {
        var posts = await repository.GetPostByNameAsync(request.Category,request.Country,request.City,request.Realtor,request.Name);

        if (posts == null) return PagedList<Post>.getPagedList(new List<Post>(), request.Page, request.SizeOfPage);

        var response = PagedList<Post>.getPagedList(posts, request.Page, request.SizeOfPage);

        return response;
    }
}

