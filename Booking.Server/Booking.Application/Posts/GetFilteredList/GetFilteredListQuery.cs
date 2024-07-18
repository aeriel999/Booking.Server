using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFilteredList;
//ToDo Nazar
public record GetFilteredListQuery(
    Guid? Category,
    Guid? Country,
    Guid? City,
    Guid? Realtor,
    int Page,
    int SizeOfPage):IRequest<ErrorOr<PagedList<Post>?>>;


