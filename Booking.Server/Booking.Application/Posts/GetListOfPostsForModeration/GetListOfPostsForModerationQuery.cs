using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetListOfPostsForModeration;

public record GetListOfPostsForModerationQuery(Guid UserId, string Role, int Page, int SizeOfPage) 
	: IRequest<ErrorOr<PagedList<Post>?>>;
 
