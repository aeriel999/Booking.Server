using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Services;
using Booking.Infrastructure.Authentification;
using Booking.Infrastructure.Common.Persistence;
using Booking.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Booking.Infrastructure;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructure(
		this IServiceCollection services,
		ConfigurationManager configuration)
	{
		services
			.AddPersistence(configuration)
			.AddAppIdentity()
			.AddAuth(configuration)
			//.AddRepositories()
			.AddInfrastructureServices();

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

	private static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
	{
		services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
		services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

		//services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
		//services.AddTransient<JwtTokenGenerator>();
		 
		return services;
	}

	private static IServiceCollection AddAuth(
		this IServiceCollection services, ConfigurationManager configuration)
	{
		var jwtSettings = new JwtSettings();
		configuration.Bind(JwtSettings.SectionName, jwtSettings);
		
		services.AddSingleton(Options.Create(jwtSettings));
		services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

		services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,
				ValidIssuer = jwtSettings.Issuer,
				ValidAudience = jwtSettings.Audience,
				IssuerSigningKey = new SymmetricSecurityKey(
					Encoding.UTF8.GetBytes(jwtSettings.Secret)),
				ClockSkew = TimeSpan.Zero,
			});

		return services;
	}
}
