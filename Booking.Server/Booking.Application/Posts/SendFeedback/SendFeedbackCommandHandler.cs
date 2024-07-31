using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.Posts.SendFeedback;
public class SendFeedbackCommandHandler(IPostFeedbackRepository repository, IUserRepository userRepository, IPostRepository postRepository) : IRequestHandler<SendFeedbackCommand, ErrorOr<SendFeedbackCommandResult>>
{
    public async Task<ErrorOr<SendFeedbackCommandResult>> Handle(SendFeedbackCommand request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(request.Text))
        {
            Feedback feedback = new Feedback()
            {
                Text = request.Text,
                Rating = request.Rating,
                PostId = request.PostId,
                ClientId = request.ClientId,
                FeedbackAt = DateTime.Now.ToUniversalTime()
            };
            await repository.CreateAsync(feedback);
        }

        

        var post = await postRepository.GetPostById(request.PostId);

        if (post == null) return Error.NotFound("Post is not found");

        var responsePost = await postRepository.ChangeRatingForPostAsync(request.PostId, request.Rating);

        if (responsePost.IsError)
            return responsePost.FirstError;

        var responseRealtor = await userRepository.ChangeRatingForRealtorAsync(post.UserId, request.Rating);
        if (responseRealtor.IsError)
            return responseRealtor.FirstError;

        return new SendFeedbackCommandResult(request.Text, request.Rating);

    }
}

