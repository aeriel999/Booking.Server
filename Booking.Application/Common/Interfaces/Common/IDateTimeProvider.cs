namespace Booking.Application.Common.Interfaces.Common;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}
