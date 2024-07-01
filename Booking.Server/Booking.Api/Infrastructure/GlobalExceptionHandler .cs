

using Booking.Api.Infrastructure.NLog;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Infrastructure;

//internal sealed class GlobalExeptionHandler(ILogger<GlobalExeptionHandler> _logger)
//	: IExceptionHandler
//{
//	public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
//		CancellationToken cancellationToken)
//	{
//		_logger.LogError(exception, "Exeption occurred: {Message}", exception.Message);

//		var problenDetails = new ProblemDetails
//		{
//			Status = StatusCodes.Status500InternalServerError,
//			Title = "Server Error",
//			Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1"
//		};

//		httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

//		await httpContext.Response.WriteAsJsonAsync(problenDetails, cancellationToken);

//		return true;
//	}
//}

public class GlobalExceptionHandler : IExceptionHandler
{
	private readonly ILoggerService _logger;

	public GlobalExceptionHandler(ILoggerService logger)
	{
		this._logger = logger;
	}

	public async ValueTask<bool> TryHandleAsync(
		HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
	{
		_logger.LogError(exception, $"Exception occurred: {exception.Message}");

		var problemDetails = new ProblemDetails
		{
			Status = StatusCodes.Status500InternalServerError,
			Title = "Server Error",
			Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1"
		};

		httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

		await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

		return true;
	}
}
