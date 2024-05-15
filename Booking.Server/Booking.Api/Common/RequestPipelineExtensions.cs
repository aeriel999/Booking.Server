using Microsoft.Extensions.FileProviders;

namespace Booking.Api.Common;

public static class RequestPipelineExtensions
{
    public static void UseCustomStaticFiles(this WebApplication application)
    {
        var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");

        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }

        application.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(dir),
            RequestPath = "/images"
        });
    }
}
