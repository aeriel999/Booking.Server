using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetListOfPost;

public class GetListOfPostQueryHandler(IPostRepository repository)
    : IRequestHandler<GetListOfPostQuery, ErrorOr<PagedList<Post>>>
{
    public async Task<ErrorOr<PagedList<Post>>> Handle(GetListOfPostQuery request, CancellationToken cancellationToken)
    {
       var respons = await repository.GetAllAsync(request.page, request.sizeOfPage);

       if (respons == null) return Error.NotFound("List is empty");

       return respons;
    }
}

