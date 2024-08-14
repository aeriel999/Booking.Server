using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetCitiesFilteredList;
public record GetCitiesFilteredListQuery(Guid? Category, Guid Country, Guid? Realtor) : IRequest<List<PostCity>?>;

