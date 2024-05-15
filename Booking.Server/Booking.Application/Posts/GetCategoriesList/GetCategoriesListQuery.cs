using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetCategoriesList;

public record GetCategoriesListQuery() : IRequest<ErrorOr<List<PostCategory>>>;
 
