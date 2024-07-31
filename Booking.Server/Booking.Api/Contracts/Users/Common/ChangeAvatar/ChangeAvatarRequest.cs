using Booking.Api.Common.Validation;
using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Users.Common.ChangeAvatar;

public record ChangeAvatarRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[FileSize(5 * 1024 * 1024)]
	public required IFormFile Avatar { get; init; }
}
