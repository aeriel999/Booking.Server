using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFilteredList;
public class GetFilteredListQueryHandler(IPostRepository repository) : IRequestHandler<GetFilteredListQuery, ErrorOr<PagedList<Post>>>
{
    public async Task<ErrorOr<PagedList<Post>>> Handle(GetFilteredListQuery request, CancellationToken cancellationToken)
    {
       var respons = await repository.GetFilteredListAsync(request.type, request.page, request.sizeOfPage, request.id);

       if(respons == null) return Error.NotFound("List is empty");

       return respons;

    }
}

