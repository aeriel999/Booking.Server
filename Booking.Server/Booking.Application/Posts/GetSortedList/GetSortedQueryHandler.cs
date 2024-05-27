using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Posts.GetSortedList.ByCategory;
using Booking.Application.Posts.GetSortedList.ByNumberOfRooms;
using Booking.Application.Posts.GetSortedList.ByPrice;
using Booking.Application.Posts.GetSortedList.ByRealtor;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetSortedList;
public class GetSortedList(IPostRepository repository)
    : IRequestHandler<GetSortedListByNumberOfRoomsQuery, ErrorOr<PagedList<Post>>>,
      IRequestHandler<GetSortedListByPriceQuery, ErrorOr<PagedList<Post>>>,
      IRequestHandler<GetSortedListByCategoryQuery, ErrorOr<PagedList<Post>>>,
      IRequestHandler<GetSortedListByRealtorQuery, ErrorOr<PagedList<Post>>>
{
    public async Task<ErrorOr<PagedList<Post>>> Handle
        (GetSortedListByNumberOfRoomsQuery request, 
        CancellationToken cancellationToken)
    {
        var respons = await repository.GetSortedListByNumberOfRoomsAsync(request.page, request.sizeOfPage); 

        if (respons == null) return Error.NotFound("List is empty");

        return respons;
    }

    public async Task<ErrorOr<PagedList<Post>>> Handle(
        GetSortedListByPriceQuery request,
        CancellationToken cancellationToken)
    {
        var respons = await repository.GetSortedListByPriceAsync(request.page, request.sizeOfPage);

        if (respons == null) return Error.NotFound("List is empty");

        return respons;
    }

    public async Task<ErrorOr<PagedList<Post>>> Handle
        (GetSortedListByCategoryQuery request, 
        CancellationToken cancellationToken)
    {
        var respons = await repository.GetSortedListByCategoryAsync(request.page, request.sizeOfPage);

        if (respons == null) return Error.NotFound("List is empty");

        return respons;
    }

    public async Task<ErrorOr<PagedList<Post>>> Handle
        (GetSortedListByRealtorQuery request, 
        CancellationToken cancellationToken)
    {
        var respons = await repository.GetSortedListByRealtorAsync(request.page, request.sizeOfPage);

        if (respons == null) return Error.NotFound("List is empty");

        return respons;
    }
}
