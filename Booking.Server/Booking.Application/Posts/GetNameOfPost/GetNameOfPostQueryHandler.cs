using Booking.Application.Common.Interfaces.Post;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetNameOfPost;
public class GetNameOfPostQueryHandler(IPostRepository repository) : IRequestHandler<GetNameOfPostQuery, ErrorOr<List<string>>>
{
    public async Task<ErrorOr<List<string>>> Handle(GetNameOfPostQuery request, CancellationToken cancellationToken)
    {
        var result = await repository.GetNameOfPostAsync(request.Category,request.Country,request.City,request.Realtor,request.Name);

        if (result == null) return Error.NotFound("Names not found");

        return result;
    }
}
