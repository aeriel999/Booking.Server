using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetSortedList.ByCategory;
public record GetSortedListByCategoryQuery(int page, int sizeOfPage) : IRequest<ErrorOr<PagedList<Post>>>;

