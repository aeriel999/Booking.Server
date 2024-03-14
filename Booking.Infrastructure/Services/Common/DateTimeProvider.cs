using Booking.Application.Common.Interfaces.Common;

namespace Booking.Infrastructure.Services.Common;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
