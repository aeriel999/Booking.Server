using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostById;
public class GePostByIdQueryHandler(IPostRepository repository) : IRequestHandler<GetPostByIdQuery, ErrorOr<Post>>
{      
    public async Task<ErrorOr<Post>> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
    {
        var respons = await repository.GetPostWithIncludesByIdAsync(request.Id);

        if(respons == null) return Error.NotFound("Post is not found");

        return respons;
    }
}

