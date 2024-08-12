using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetServicesList;

public record GetServicesListQuery() : IRequest<ErrorOr<List<Service>>>;
 