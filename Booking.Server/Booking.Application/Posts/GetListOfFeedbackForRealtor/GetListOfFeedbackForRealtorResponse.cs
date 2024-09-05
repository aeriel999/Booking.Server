namespace Booking.Application.Posts.GetListOfFeedbackForRealtor;

public record GetListOfFeedbackForRealtorResponse(
	string PostName,
	string CountryName,
	string CityName,
	float PostRaiting,
	string PostImage,
	string UserName,
	string GivenRate,
	string Date,
	string ReviewText);
 
 