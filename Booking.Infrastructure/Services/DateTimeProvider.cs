using Booking.Application.Common.Interfaces.Services;

namespace Booking.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
	public DateTime UtcNow => DateTime.UtcNow;
}
