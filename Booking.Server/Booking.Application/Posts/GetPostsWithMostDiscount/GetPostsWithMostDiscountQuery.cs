using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostsWithMostDiscount;
public record GetPostsWithMostDiscountQuery():IRequest<ErrorOr<List<Post>>>;

