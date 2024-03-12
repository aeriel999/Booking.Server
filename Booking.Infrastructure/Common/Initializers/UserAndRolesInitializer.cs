﻿using Booking.Domain.Constants;
using Booking.Domain.Users;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Booking.Infrastructure.Common.Initializers;

public static class UserAndRolesInitializer
{ 
	public async static void SeedData(this IApplicationBuilder app)
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
				await roleManager.CreateAsync(new IdentityRole<Guid> { Name = Roles.Admin });
				await roleManager.CreateAsync(new IdentityRole<Guid> { Name = Roles.User });
				await roleManager.CreateAsync(new IdentityRole<Guid> { Name = Roles.Realtor });
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
