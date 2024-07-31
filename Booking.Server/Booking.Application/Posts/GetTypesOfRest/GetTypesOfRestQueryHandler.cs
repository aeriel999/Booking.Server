using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetTypesOfRest;
public class GetTypesOfRestQueryHandler(IPostTypeOfRestRepository repository) : IRequestHandler<GetTypesOfRestQuery, ErrorOr<List<PostTypeOfRest>>>
{
    public async Task<ErrorOr<List<PostTypeOfRest>>> Handle(GetTypesOfRestQuery request, CancellationToken cancellationToken)
    {
        var response = await repository.GetListTypeOfRestWithImagesAsync();

        if (response == null) return Error.NotFound("Types of rest are not found");

        return response;
    }
}

