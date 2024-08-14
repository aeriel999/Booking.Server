using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Posts.GetCategoriesList;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCategoriesFilteredList;
public class GetCategoriesFilteredListQueryHandler(IPostCategoryRepository postCategoryRepository) :
    IRequestHandler<GetCategoriesFilteredListQuery, ErrorOr<List<PostCategory>>>
{
    public async Task<ErrorOr<List<PostCategory>>> Handle(
        GetCategoriesFilteredListQuery request, CancellationToken cancellationToken)
    {
        var listOfCategories = await postCategoryRepository.GetFilteredListOfCategoriesAsync(request.Country, request.City, request.Realtor);

        if (listOfCategories == null)
            return Error.NotFound("Error in loading categories list");

        return listOfCategories;
    }
}

