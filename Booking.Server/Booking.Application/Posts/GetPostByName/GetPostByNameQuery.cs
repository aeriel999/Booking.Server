using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostByName;
public record GetPostByNameQuery(Guid? category, 
                                 Guid? country,
                                 Guid? city,
                                 Guid? realtor,  
                                 string name,
                                 int page,
                                 int sizeOfPage) : IRequest<ErrorOr<PagedList<Post>>>;