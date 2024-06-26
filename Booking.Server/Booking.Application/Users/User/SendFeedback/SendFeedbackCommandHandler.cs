using Booking.Application.Common.Interfaces.Users;
using Booking.Application.ForUsers.User.SendFeedback;
using Booking.Domain.Users;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.Users.User.SendFeedback;
public class SendFeedbackCommandHandler(IUserFeedbackRepository repository,IUserRepository userRepository) : IRequestHandler<SendFeedbackCommand, ErrorOr<SendFeedbackCommandResult>>
{
    public async Task<ErrorOr<SendFeedbackCommandResult>> Handle(SendFeedbackCommand request, CancellationToken cancellationToken)
    {
        if (!String.IsNullOrEmpty(request.Text)){
            Feedback feedback = new Feedback()
            {
                Text = request.Text,
                Rating = request.Rating,
                RealtorId = request.RealtorId,
                ClientId = request.ClientId,
                FeedbackAt = DateTime.Now.ToUniversalTime()
            };
            await repository.CreateAsync(feedback);
        }
       

        var response = userRepository.ChangeRatingForRealtorAsync(request.RealtorId, request.Rating);
        if (response.Result.IsError)
            return response.Result.FirstError;

        return new SendFeedbackCommandResult(request.Text,request.Rating);

    }
}

