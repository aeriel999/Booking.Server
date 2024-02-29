using Booking.Api.Infrasrtructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Booking.Api;

public static class DependencyInjection
{
	public static IServiceCollection AddPresentation(this IServiceCollection services,
		IConfiguration configuration)
	{
		services.AddControllers();

		services.AddExceptionHandler<GlobalExeptionHandler>()
			.AddProblemDetails();

		services.AddSwagger();

		return services;
	}

	private static IServiceCollection AddSwagger(this IServiceCollection services)
	{
		services.AddEndpointsApiExplorer();

		services.AddSwaggerGen(option =>
		{
			option.SwaggerDoc("v1", new OpenApiInfo { Title = "Dashboard API", Version = "v1" });

			option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
			{
				In = ParameterLocation.Header,
				Description = "Please enter a valid token",
				Name = "Authorization",
				Type = SecuritySchemeType.Http,
				BearerFormat = "JWT",
				Scheme = "Bearer"
			});

			option.AddSecurityRequirement(new OpenApiSecurityRequirement
			{
				{
					new OpenApiSecurityScheme
					{
						Reference = new OpenApiReference
						{
							Type=ReferenceType.SecurityScheme,
							Id="Bearer"
						}
					},
					Array.Empty<string>()
				}
			});
		});

		services.AddSwaggerGen();

		return services;
	}
}
