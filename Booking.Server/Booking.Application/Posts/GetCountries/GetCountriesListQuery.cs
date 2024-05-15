using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCountries;

public record GetCountriesListQuery() : IRequest<ErrorOr<List<PostCountry>>>;
 
