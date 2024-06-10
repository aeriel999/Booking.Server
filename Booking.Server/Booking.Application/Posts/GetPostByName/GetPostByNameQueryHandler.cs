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
        var result = await repository.GetPostByNameAsync(request.category,request.country,request.city,request.realtor,request.name, request.page, request.sizeOfPage);

        if (result == null) return Error.NotFound("Posts not found");

        return result;
    }
}

