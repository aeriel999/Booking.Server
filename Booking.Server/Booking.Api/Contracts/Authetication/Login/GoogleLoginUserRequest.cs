namespace Booking.Api.Contracts.Authetication.Login;

public record GoogleLoginUserRequest
{
    //ToDo length
    public required string GoogleToken { get; set; }
}
