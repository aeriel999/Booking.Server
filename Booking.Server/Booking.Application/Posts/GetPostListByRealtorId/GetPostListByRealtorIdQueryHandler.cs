using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostListByRealtorId;
    public class GetPostListByRealtorIdQueryHandler(IPostRepository repository) : IRequestHandler<GetPostListByRealtorIdQuery, ErrorOr<List<Post>>>
{
    public async Task<ErrorOr<List<Post>>> Handle(GetPostListByRealtorIdQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.GetListPostByRealtorIdAsync(request.id);

        if (response == null) return Error.NotFound("List is empty");

        return response;
    }
}

