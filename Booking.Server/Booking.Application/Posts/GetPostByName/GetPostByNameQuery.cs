using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostByName;
public record GetPostByNameQuery(Guid? Category, 
                                 Guid? Country,
                                 Guid? City,
                                 Guid? Realtor,  
                                 string Name,
                                 int Page,
                                 int SizeOfPage) : IRequest<ErrorOr<PagedList<Post>>>;