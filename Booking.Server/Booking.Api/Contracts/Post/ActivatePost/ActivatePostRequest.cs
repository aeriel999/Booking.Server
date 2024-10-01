using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Post.ActivatePost;

public record ActivatePostRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required Guid PostId { get; init; }
}
