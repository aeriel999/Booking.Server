using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Infrastructure;

public class GlobalExeptionHandler(ILogger<GlobalExeptionHandler> logger) : IExceptionHandler
{
	public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
		CancellationToken cancellationToken)
	{
		logger.LogError(exception, "Exeption occurred: {Message}", exception.Message);

		var problenDetails = new ProblemDetails
		{
			Status = StatusCodes.Status500InternalServerError,
			Title = "Server Error",
			Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1"
		};

		httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

		await httpContext.Response.WriteAsJsonAsync(problenDetails, cancellationToken);

		return true;
	}
}
