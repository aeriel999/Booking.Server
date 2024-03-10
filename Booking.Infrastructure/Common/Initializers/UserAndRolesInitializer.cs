using Booking.Domain.Users;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Booking.Infrastructure.Common.Initializers;

public static class UserAndRolesInitializer
{
	//ToDo Move Roles
	public static class Roles
	{
		public static List<string> All = new()
		{
			Admin,
			User
		};
		public const string Admin = "Admin";
		public const string User = "User";
	}
	public static void SeedData(this IApplicationBuilder app)
	{
		using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
		{
			var service = scope.ServiceProvider;

			var context = service.GetRequiredService<BookingDbContext>();

			context.Database.Migrate();

			var userManager = scope.ServiceProvider
				.GetRequiredService<UserManager<User>>();

			var roleManager = scope.ServiceProvider
				.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

			if (!context.Roles.Any())
			{
				foreach (var role in Roles.All)
				{
					var result = roleManager.CreateAsync(new IdentityRole<Guid>
					{
						Name = role
					}).Result;
				}
			}

			if (!context.Users.Any())
			{
				var user = new User
				{
					Email = "admin@email.com",
					UserName = "admin@email.com",
					EmailConfirmed = true,
				};
				var result = userManager.CreateAsync(user, "Admin+1111").Result;
				if (result.Succeeded)
				{
					result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
				}
			}


		}
	}
}
