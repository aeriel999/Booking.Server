using Booking.Domain.Users;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Booking.Infrastructure;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructure(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		services
			.AddPersistence(configuration)
			.AddAppIdentity();
			//.AddRepositories()
			//.AddInfrastructureServices();

		return services;
	}

	private static IServiceCollection AddPersistence(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		string connStr = configuration.GetConnectionString("DefaultConnection")!;

		services.AddDbContext<BookingDbContext>(opt =>
		{
			//opt.UseSqlServer(connectionString);
			opt.UseNpgsql(connStr);

			opt.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
		});

		return services;
	}

	private static IServiceCollection AddAppIdentity(this IServiceCollection services)
	{
		services.AddIdentityCore<BookingDbContext>(option =>
		{
			option.SignIn.RequireConfirmedEmail = true;
			option.Lockout.MaxFailedAccessAttempts = 5;
			option.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
			option.Password.RequireDigit = true;
			option.Password.RequireLowercase = true;
			option.Password.RequireUppercase = true;
			option.Password.RequiredLength = 6;
			option.Password.RequireNonAlphanumeric = true;
			option.User.RequireUniqueEmail = true;
		})
			.AddEntityFrameworkStores<BookingDbContext>();

		return services;
	}

	//private static IServiceCollection AddRepositories(this IServiceCollection services)
	//{
	//	services.AddScoped<IUserRepository, UserRepository>();
	//	services.AddScoped<IApartmentsRepository, ApartmentsRepository>();
	//	services.AddScoped<IImageRepository, ImageRepository>();
	//	services.AddScoped<IStreetRepository, StreetRepository>();
	//	services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

	//	return services;
	//}

	//private static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
	//{
	//	services.AddScoped<IEmailService, EmailService>();
	//	services.AddScoped<IJwtService, JwtService>();
	//	services.AddScoped<IAppAuthenticationService, AppAuthenticationService>();
	//	services.AddScoped<IEmailConfirmationTokenService, EmailConfirmationTokenService>();
	//	services.AddScoped<IImageStorageService, ImageStorageService>();

	//	services.AddTransient<EmailService>();
	//	services.AddTransient<JwtService>();
	//	services.AddTransient<AppAuthenticationService>();
	//	services.AddTransient<EmailConfirmationTokenService>();
	//	services.AddTransient<ImageStorageService>();


	//	return services;
	//}
}
