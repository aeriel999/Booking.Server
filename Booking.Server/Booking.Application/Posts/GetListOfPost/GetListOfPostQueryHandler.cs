using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetListOfPost;

public class GetListOfPostQueryHandler(IPostRepository repository)
    : IRequestHandler<GetListOfPostQuery, ErrorOr<PagedList<Post>?>>
{
    public async Task<ErrorOr<PagedList<Post>?>> Handle(GetListOfPostQuery request, CancellationToken cancellationToken)
    {
        //TODO Nazar + Validation
       var posts = await repository.GetAllAsync();

        if (posts == null) return PagedList<Post>.getPagedList(new List<Post>(), request.Page, request.SizeOfPage);

        var response = PagedList<Post>.getPagedList(posts, request.Page, request.SizeOfPage);

        return response;
    }
}

