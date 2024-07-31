using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetRealtorsByUserFeedbacks;
public class GetPostsByUserFeedbacksQueryHandler(IPostFeedbackRepository repository) : IRequestHandler<GetPostsByUserFeedbacksQuery, ErrorOr<List<Post>>>
{
    public async Task<ErrorOr<List<Post>>> Handle(GetPostsByUserFeedbacksQuery request, CancellationToken cancellationToken)
    {
        var result = await repository.GetPostsByUserFeedbacksAsync(request.Id);

        if (result == null) return Error.NotFound("Posts are not found!");

        return result; 
    }
}

