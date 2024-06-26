using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using MediatR;

namespace Booking.Application.Posts.GetArchivedPostList;

public record GetArchivedPostListForRealtorQuery(int Page, int SizeOfPage, Guid UserId) 
	: IRequest<PagedList<Post>>;
 
