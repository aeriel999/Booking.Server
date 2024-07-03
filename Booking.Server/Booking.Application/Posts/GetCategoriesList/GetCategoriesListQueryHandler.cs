using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCategoriesList;

public class GetCategoriesListQueryHandler(IPostCategoryRepository postCategoryRepository) :
	IRequestHandler<GetCategoriesListQuery, ErrorOr<List<PostCategory>>>
{
	public async Task<ErrorOr<List<PostCategory>>> Handle(
		GetCategoriesListQuery request, CancellationToken cancellationToken)
	{
		var listOfCategories = await postCategoryRepository.GetListOfCategoriesAsync();

		if (listOfCategories == null)
			return Error.NotFound("Error in loading categories list");

		return listOfCategories;
	}
}
