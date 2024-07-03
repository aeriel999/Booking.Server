using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetNameOfPost;

public record GetNameOfPostQuery(
    Guid? Category,
    Guid? Country,
    Guid? City,
    Guid? Realtor, string Name):IRequest<ErrorOr<List<string>>>;

