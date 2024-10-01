using Booking.Domain.Users;

namespace Booking.Api.Common.Mapping;

public static class CommonMaping
{
	public static string GetUserName(User user)
	{
		if (string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName))
		{
			if (string.IsNullOrEmpty(user.LastName) && string.IsNullOrEmpty(user.FirstName))
				return user.Email!;
			else if (string.IsNullOrEmpty(user.LastName))
				return user.FirstName!;
			else
				return user.LastName;
		}
		else
			return user.FirstName + " " + user.LastName;
	}
}
