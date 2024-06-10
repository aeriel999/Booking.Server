using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetNameOfPost;

public record GetNameOfPostQuery(
    Guid? category,
    Guid? country,
    Guid? city,
    Guid? realtor, string name):IRequest<ErrorOr<List<string>>>;

