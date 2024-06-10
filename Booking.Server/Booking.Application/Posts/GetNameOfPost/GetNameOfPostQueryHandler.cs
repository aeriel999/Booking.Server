using Booking.Application.Common.Interfaces.Post;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetNameOfPost;
public class GetNameOfPostQueryHandler(IPostRepository repository) : IRequestHandler<GetNameOfPostQuery, ErrorOr<List<string>>>
{
    public async Task<ErrorOr<List<string>>> Handle(GetNameOfPostQuery request, CancellationToken cancellationToken)
    {
        var result = await repository.GetNameOfPostAsync(request.category,request.country,request.city,request.realtor,request.name);

        if (result == null) return Error.NotFound("Names not found");

        return result;
    }
}
