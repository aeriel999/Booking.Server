using Booking.Domain.Users;
using ErrorOr;
using MediatR;

namespace Booking.Application.Users.Realtor.GetRealtorsFilteredList;
public record GetRealtorsFilteredListQuery(Guid? Category, Guid? Country, Guid? City) : IRequest<ErrorOr<List<User>>>;

