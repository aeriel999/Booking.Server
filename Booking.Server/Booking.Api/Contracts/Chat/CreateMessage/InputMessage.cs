﻿using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Chat.CreateMessage;

public record InputMessage
{
	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required string Message { get; init; }

	[Required(ErrorMessage = "{PropertyName} must not be empty")]
	public required Guid RoomId { get; init; }
}  