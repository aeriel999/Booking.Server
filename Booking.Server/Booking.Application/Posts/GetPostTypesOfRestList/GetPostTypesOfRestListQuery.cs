using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostTypesOfRestList;

public class GetPostTypesOfRestListQuery() : IRequest<ErrorOr<List<PostTypeOfRest>>>;

