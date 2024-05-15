using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetTypeOfRent;

public record GetTypeOfRentListQuery() : IRequest<ErrorOr<List<PostTypeOfRent>>>;
 
