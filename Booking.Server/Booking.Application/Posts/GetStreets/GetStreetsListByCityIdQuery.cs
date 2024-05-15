using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetStreets;

public record GetStreetsListByCityIdQuery(Guid CityId) : IRequest<List<PostStreet>?>;
 
