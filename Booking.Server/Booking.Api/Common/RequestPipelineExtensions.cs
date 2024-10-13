using Microsoft.Extensions.FileProviders;

namespace Booking.Api.Common;

public static class RequestPipelineExtensions
{
    public static void UseCustomStaticFiles(this WebApplication application)
    {
        
        
        application.UseStaticFiles();
    }
}
