namespace Booking.Api.Contracts.Users.Realtor.Get.Information;
public record GetInformationAboutRealtorResponse
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Avatar { get; set; }
    public  float Rating { get; set; }
    public required string Phone { get; set; }
    public string? HeaderImage { get; set; }

}
