using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFilteredList;
public record GetFilteredListQuery(
    string type,
    int page,
    int sizeOfPage,
    Guid id):IRequest<ErrorOr<PagedList<Post>>>;


