using System.ComponentModel.DataAnnotations;

namespace Booking.Api.Contracts.Users.Realtor.Edit;

public record EditRealtorPrifileInfoRequest
{
	[Length(2, 24)]
	public string? FirstName { get; init; }


	[Length(2, 24)]
	public string? LastName { get; init; }


	[Phone(ErrorMessage = "{PropertyValue} has wrong format")]
	[Length(10, 24)]
	public string? PhoneNumber { get; init; }


	[EmailAddress(ErrorMessage = "{PropertyValue} has wrong format")]
	[Length(5, 254)]
	public string? Email { get; init; }


	public IFormFile? Avatar { get; init; }
}
