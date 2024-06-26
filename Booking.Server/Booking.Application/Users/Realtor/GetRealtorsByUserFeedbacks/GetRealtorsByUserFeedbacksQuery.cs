using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsByUserFeedbacks;
public record GetRealtorsByUserFeedbacksQuery(string id):IRequest<ErrorOr<List<Booking.Domain.Users.User>>>;

