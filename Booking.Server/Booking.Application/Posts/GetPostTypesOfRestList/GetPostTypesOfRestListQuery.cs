using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostPostTypesOfRestList;

public class GetPostTypesOfRestListQuery() : IRequest<ErrorOr<List<PostTypeOfRest>>>;
 
