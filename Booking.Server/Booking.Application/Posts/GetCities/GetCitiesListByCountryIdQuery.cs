using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetCities;

public record GetCitiesListByCountryIdQuery(Guid CountryId) : IRequest<List<PostCity>?>;
 
