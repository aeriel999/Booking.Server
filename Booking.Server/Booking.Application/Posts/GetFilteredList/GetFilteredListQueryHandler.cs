using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFilteredList;
public class GetFilteredListQueryHandler(IPostRepository repository) : IRequestHandler<GetFilteredListQuery, ErrorOr<PagedList<Post>?>>
{
    public async Task<ErrorOr<PagedList<Post>?>> Handle(GetFilteredListQuery request, CancellationToken cancellationToken)
    {
       var posts = await repository.GetFilteredListAsync(request.Category,request.Country,request.City,request.Realtor);

        if (posts == null) return PagedList<Post>.getPagedList(new List<Post>(), request.Page, request.SizeOfPage);

        var response = PagedList<Post>.getPagedList(posts, request.Page, request.SizeOfPage);

        return response;

    }
}

