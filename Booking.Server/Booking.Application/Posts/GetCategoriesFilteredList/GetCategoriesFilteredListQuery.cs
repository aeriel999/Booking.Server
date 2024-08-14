using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCategoriesFilteredList;

public record GetCategoriesFilteredListQuery(Guid? Country, Guid? City, Guid? Realtor) : IRequest<ErrorOr<List<PostCategory>>>;

