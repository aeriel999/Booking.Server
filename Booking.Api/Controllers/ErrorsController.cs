using Booking.Api.Infrastructure;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers;

[ApiController]
public class ErrorsController : ApiController
{
	//ToDo Add loging
	//ToDo Add Email sends with error data
	[ApiExplorerSettings(IgnoreApi = true)]
	[Route("/error-development")]
	public IActionResult HandleErrorDevelopment(
	[FromServices] IHostEnvironment hostEnvironment)
	{
		if (!hostEnvironment.IsDevelopment())
		{
			return NotFound();
		}

		var exceptionHandlerFeature =
			HttpContext.Features.Get<IExceptionHandlerFeature>()!;

		return Problem(
			detail: exceptionHandlerFeature.Error.StackTrace,
			title: exceptionHandlerFeature.Error.Message);
	}

	[ApiExplorerSettings(IgnoreApi = true)]
	[Route("/error")]
	public IActionResult HandleError() =>
		Problem();
}
