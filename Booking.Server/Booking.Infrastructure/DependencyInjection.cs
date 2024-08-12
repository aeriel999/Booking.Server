using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Chat;
using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Users;
using Booking.Infrastructure.Authentification;
using Booking.Infrastructure.Common.Persistence;
using Booking.Infrastructure.Repositories;
using Booking.Infrastructure.Services.Chat;
using Booking.Infrastructure.Services.Common;
using Booking.Infrastructure.Services.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
			.AddRepositories()
			.AddInfrastructureServices()
			.AddAuth(configuration);

		return services;
	}

	private static IServiceCollection AddPersistence(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		string connStr = configuration.GetConnectionString("DefaultConnection")!;

		services.AddDbContext<BookingDbContext>(opt =>
		{
			//opt.UseSqlServer(connStr);
			opt.UseNpgsql(connStr);

			opt.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
		});

		return services;
	}

	private static IServiceCollection AddAppIdentity(this IServiceCollection services)
	{
		services.AddIdentity<User, IdentityRole<Guid>>(option =>
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
			.AddEntityFrameworkStores<BookingDbContext>().AddDefaultTokenProviders();

		return services;
	}

	private static IServiceCollection AddRepositories(this IServiceCollection services)
	{
		services.AddScoped<IUserRepository, UserRepository>();

		services.AddScoped<IPostCountryRepository, PostCountryRepository>();
		services.AddScoped<IPostCityRepository, PostCityRepository>();
		services.AddScoped<IPostCategoryRepository, PostCategoryRepository>();
        services.AddScoped<IPostStreetRepository, PostStreetRepository>();
        services.AddScoped<IPostRepository, PostRepository>();
        services.AddScoped<IPostImageRepository, PostImageRepository>();
        services.AddScoped<IChatRoomRepository, ChatRoomRepository>();
		services.AddScoped<IUserMessageRepository, UserMessageRepository>();
		services.AddScoped<IPostTypeOfRestRepository, PostTypeOfRestRepository>();
		services.AddScoped<IPostFeedbackRepository, PostFeedbackRepository>();
		services.AddScoped<IPostPostTypeOfRestRepository,PostPostTypeOfRestRepository>();
        services.AddScoped<IPostServiceRepository, PostServiceRepository>();
        services.AddScoped<IPostTypeOfRestRepository, PostTypeOfRestRepository>();
		services.AddScoped<IPostTypeOfRestRepository, PostTypeOfRestRepository>();

		return services;
	}

	private static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
	{
		services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
		services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

		services.AddScoped<ISmtpService, SmtpService>();
		services.AddTransient<SmtpService>();

		services.AddScoped<IUserAuthenticationService, UserAuthenticationService>();
		services.AddTransient<UserAuthenticationService>();

		services.AddScoped<IImageStorageService, ImageStorageService>();
		services.AddTransient<ImageStorageService>();

		services.AddScoped<IChatRegystryService, ChatRegystryService>();
		services.AddTransient<ChatRegystryService>();

		return services;
	}

	private static IServiceCollection AddAuth(
		this IServiceCollection services, ConfigurationManager configuration)
	{
		var jwtSettings = new JwtSettings();
		configuration.Bind(JwtSettings.SectionName, jwtSettings);

		services.AddSingleton(Options.Create(jwtSettings));
		services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

		services.AddAuthentication(options =>
		{
			// Identity made Cookie authentication the default.
			// However, we want JWT Bearer Auth to be the default.
			options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		})
			.AddJwtBearer(options => {
				options.RequireHttpsMetadata = false;
				options.TokenValidationParameters = new TokenValidationParameters
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
				};

				options.Events = new JwtBearerEvents
				{
					OnMessageReceived = context =>
					{
						var accessToken = context.Request.Query["access_token"];

						var path = context.HttpContext.Request.Path;

						if (!string.IsNullOrEmpty(accessToken) &&
							(path.StartsWithSegments("/chat")))
						{
							context.Token = accessToken;
						}
						return Task.CompletedTask;
					}
				};

			});

		


		return services;
	}
}
