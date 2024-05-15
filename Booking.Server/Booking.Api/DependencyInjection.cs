using Booking.Api.Common.Errors;
using Booking.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.OpenApi.Models;
using Mapster;
using MapsterMapper;
using System.Reflection;
using Booking.Api.Infrastructure.NLog;
using Booking.Api.Common.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace Booking.Api;

public static class DependencyInjection
{
	public static IServiceCollection AddPresentation(this IServiceCollection services)
	{
		services.AddControllers()
			 .AddJsonOptions(options =>
			 {
				 options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
			 });

		services.AddSingleton<ProblemDetailsFactory, BookingProblemDetailsFactory>();

		services.AddExceptionHandler<GlobalExceptionHandler>()
			.AddProblemDetails();

		services.AddSingleton<ILoggerService, LoggerService>();

		services.AddSwagger();

		services.AddMappings();

		services.AddCustomSignalR();

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

	public static IServiceCollection AddMappings(this IServiceCollection services)
	{
		var config = TypeAdapterConfig.GlobalSettings;
		config.Scan(Assembly.GetExecutingAssembly());

		services.AddSingleton(config);
		services.AddScoped<IMapper, ServiceMapper>();

		return services;
	}

	public static IServiceCollection AddCustomSignalR(this IServiceCollection services)
	{

		services.AddSignalR();

		services.AddCors(opt =>
		{
			opt.AddPolicy("reactApp", builder =>
			{
				builder.WithOrigins("http://localhost:5173")
				.AllowAnyHeader()
				.AllowAnyMethod()
				.AllowCredentials();
			});
		});

		services.AddSingleton<IUserIdProvider, UserIdProvider>();
		services.AddScoped<ChatHub>();

		return services;
	}
}
