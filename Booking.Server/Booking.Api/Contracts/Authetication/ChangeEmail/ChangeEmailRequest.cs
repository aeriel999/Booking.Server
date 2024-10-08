﻿using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Authetication.ChangeEmail;

public record ChangeEmailRequest
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[EmailAddress(ErrorMessage = "{PropertyValue} has wrong format")]
	[Length(5, 254)]
	public required string Email { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	[Length(256, 4096)]
	public required string Token { get; init; }


	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public Guid UserId { get; init; }
}
