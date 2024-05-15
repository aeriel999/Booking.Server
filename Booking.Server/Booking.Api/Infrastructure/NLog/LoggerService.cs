using NLog;
using ILogger = NLog.ILogger;

namespace Booking.Api.Infrastructure.NLog;

public class LoggerService : ILoggerService
{
	private static readonly ILogger _logger = LogManager.GetCurrentClassLogger();
 

	public void LogDebug(Exception exception, string message)
	{
		_logger.Debug(exception, message);
	}

 
	public void LogError(Exception exception, string message)
	{
		_logger.Debug(exception, message);
	}

 

	public void LogInfo(Exception exception, string message)
	{
		_logger.Debug(exception, message);
	}

 

	public void LogTrace(Exception exception, string message)
	{
		_logger.Debug(exception, message);
	}

 
	public void LogWarn(Exception exception, string message)
	{
		_logger.Debug(exception, message);
	}
}