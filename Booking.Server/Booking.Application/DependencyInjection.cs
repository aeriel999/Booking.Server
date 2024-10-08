﻿using Booking.Application.Common.Behaviors;
using Booking.Application.Common.Services;
using FluentValidation;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

using System.Reflection;


namespace Booking.Application;

public static class DependencyInjection
{
	public static IServiceCollection AddApplication(this IServiceCollection services)
	{
		services.AddMappings();        

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));

		services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

		services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

		services.AddScoped<EmailService>();

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
}
