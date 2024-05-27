using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetSortedList.ByPrice;
public record GetSortedListByPriceQuery(int page, int sizeOfPage) : IRequest<ErrorOr<PagedList<Post>>>;
