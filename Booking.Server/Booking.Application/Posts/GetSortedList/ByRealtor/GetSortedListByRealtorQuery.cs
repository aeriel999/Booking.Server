using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetSortedList.ByRealtor;
public record GetSortedListByRealtorQuery(int page, int sizeOfPage) : IRequest<ErrorOr<PagedList<Post>>>;
