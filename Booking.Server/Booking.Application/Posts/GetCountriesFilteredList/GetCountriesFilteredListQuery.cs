using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCountriesFilteredList;

public record GetCountriesFilteredListQuery(Guid? Category,Guid? City ,Guid? Realtor) : IRequest<ErrorOr<List<PostCountry>>>;

