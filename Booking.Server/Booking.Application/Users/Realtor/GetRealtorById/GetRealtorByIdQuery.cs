using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorById;
public record GetRealtorByIdQuery(Guid id):IRequest<ErrorOr<Booking.Domain.Users.User>>;


