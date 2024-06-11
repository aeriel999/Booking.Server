using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostById;
public class GePostByIdQueryHandler(IPostRepository repository) : IRequestHandler<GetPostByIdQuery, ErrorOr<Post>>
{      
    public async Task<ErrorOr<Post>> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
    {
        var respons = await repository.GetPostByIdAsync(request.id);

        if(request == null) return Error.NotFound("Post is not found");

        return respons;
    }
}

