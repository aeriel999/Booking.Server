using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsList;
public record GetRealtorsListQuery():IRequest<ErrorOr<List<Booking.Domain.Users.User>>>;

