using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostPostTypesOfRestList;

public class GetPostPostTypesOfRestListQuery() : IRequest<ErrorOr<List<PostPostTypeOfRest>>>;
 
