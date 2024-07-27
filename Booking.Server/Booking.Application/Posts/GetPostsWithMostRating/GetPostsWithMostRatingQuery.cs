using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostsWithMostRating;
public record GetPostsWithMostRatingQuery() : IRequest<ErrorOr<List<Post>>>;

