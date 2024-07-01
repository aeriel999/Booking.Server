using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetListOfPost;

public record GetListOfPostQuery(int page, int sizeOfPage) : IRequest<ErrorOr<PagedList<Post>>>;

