using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Models;
using MediatR;

namespace Booking.Application.Posts
{
    public record PostListCommand() : IRequest<List<PostEntity>>;
}
