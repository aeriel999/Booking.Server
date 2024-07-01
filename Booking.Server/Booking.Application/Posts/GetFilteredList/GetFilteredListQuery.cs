using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetFilteredList;
//ToDo Nazar
public record GetFilteredListQuery(
    Guid? category,
    Guid? country,
    Guid? city,
    Guid? realtor,//??
    int page,
    int sizeOfPage):IRequest<ErrorOr<PagedList<Post>>>;


