using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostListForRealtor;

public record GetPostListForRealtorQuery(int Page, int SizeOfPage, Guid UserId) 
	: IRequest<ErrorOr<PagedList<Post>?>>;
 
