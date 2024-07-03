using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsByUserFeedbacks;
public record GetRealtorsByUserFeedbacksQuery(Guid Id):IRequest<ErrorOr<List<Booking.Domain.Users.User>>>;

