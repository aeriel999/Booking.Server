using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetTypesOfRest;
public record GetTypesOfRestQuery() :IRequest<ErrorOr<List<PostTypeOfRest>>>;

