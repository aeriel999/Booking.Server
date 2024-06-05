using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetNameOfPost;

public record GetNameOfPostQuery(string name):IRequest<ErrorOr<List<string>>>;

