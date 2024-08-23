using Booking.Domain.Constants;
using Booking.Domain.Posts;
using Booking.Domain.Users;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Numerics;

namespace Booking.Infrastructure.Common.Initializers;

public static class BookingInitializer
{
	public static void SeedPostDataAsync(this IApplicationBuilder app)
	{
		using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();

		var service = scope.ServiceProvider;

		var context = service.GetRequiredService<BookingDbContext>();

		context.Database.Migrate();

		if (!context.Categories.Any())
		{
			PostCategory[] categories =
			[
				new() { Name = "Apartment" },
				new() { Name = "Cottage" },
				new() { Name = "Hotel" },
				new() { Name = "Hostel" },
			];

			context.Categories.AddRange(categories);
			context.SaveChanges();
		}

		//if (!context.PostTypeOfRent.Any())
		//{
		//	PostTypeOfRent[] typeOfRents =
		//	[
		//		new() { Name = TypeOfRent.Daily },
		//		new() { Name = TypeOfRent.Hourly },
		//		new() { Name = TypeOfRent.LongTerm },
				 
		//	];

		//	context.PostTypeOfRent.AddRange(typeOfRents);
		//	context.SaveChanges();
		//}


		if (!context.Countries.Any())
		{
			PostCountry[] countries =
		 [
			new() { Name = "Ukraine" },
			 new() { Name = "Australia" },
			 new() { Name = "Austria" },
			 new() { Name = "Azerbaijan" },
			 new() { Name = "Albania" },
			 new() { Name = "Algeria" },
			 new() { Name = "Angola" },
			 new() { Name = "Andorra" },
			 new() { Name = "Antigua and Barbuda" },
			 new() { Name = "Argentina" },
			 new() { Name = "Afghanistan" },
			 new() { Name = "Bahamas" },
			 new() { Name = "Bangladesh" },
			 new() { Name = "Barbados" },
			 new() { Name = "Bahrain" },
			 new() { Name = "Belize" },
			 new() { Name = "Belgium" },
			 new() { Name = "Benin" },
			 new() { Name = "Belarus" },
			 new() { Name = "Bulgaria" },
			 new() { Name = "Bolivia" },
			 new() { Name = "Bosnia and Herzegovina" },
			 new() { Name = "Botswana" },
			 new() { Name = "Brazil" },
			 new() { Name = "Brunei" },
			 new() { Name = "Burkina Faso" },
			 new() { Name = "Burundi" },
			 new() { Name = "Bhutan" },
			 new() { Name = "Vanuatu" },
			 new() { Name = "Vatican" },
			 new() { Name = "Vietnam" },
			 new() { Name = "United Kingdom" },
			 new() { Name = "Venezuela" },
			 new() { Name = "Armenia" },
			 new() { Name = "Gabon" },
			 new() { Name = "Haiti" },
			 new() { Name = "Guyana" },
			 new() { Name = "Gambia" },
			 new() { Name = "Ghana" },
			 new() { Name = "Guatemala" },
			 new() { Name = "Guinea" },
			 new() { Name = "Guinea-Bissau" },
			 new() { Name = "Honduras" },
			 new() { Name = "Grenada" },
			 new() { Name = "Greece" },
			 new() { Name = "Georgia" },
			 new() { Name = "Denmark" },
			 new() { Name = "Democratic Republic of the Congo" },
			 new() { Name = "Djibouti" },
			 new() { Name = "Dominica" },
			 new() { Name = "Dominican Republic" },
			 new() { Name = "Ecuador" },
			 new() { Name = "Equatorial Guinea" },
			 new() { Name = "Eritrea" },
			 new() { Name = "Estonia" },
			 new() { Name = "Ethiopia" },
			 new() { Name = "Egypt" },
			 new() { Name = "Yemen" },
			 new() { Name = "Zambia" },
			 new() { Name = "Zimbabwe" },
			 new() { Name = "Israel" },
			 new() { Name = "India" },
			 new() { Name = "Indonesia" },
			 new() { Name = "Iraq" },
			 new() { Name = "Iran" },
			 new() { Name = "Ireland" },
			 new() { Name = "Iceland" },
			 new() { Name = "Spain" },
			 new() { Name = "Italy" },
			 new() { Name = "Jordan" },
			 new() { Name = "Cape Verde" },
			 new() { Name = "Kazakhstan" },
			 new() { Name = "Cambodia" },
			 new() { Name = "Cameroon" },
			 new() { Name = "Canada" },
			 new() { Name = "Qatar" },
			 new() { Name = "Kenya" },
			 new() { Name = "Kyrgyzstan" },
			 new() { Name = "China" },
			 new() { Name = "Kiribati" },
			 new() { Name = "Colombia" },
			 new() { Name = "Comoros" },
			 new() { Name = "Congo" },
			 new() { Name = "South Korea" },
			 new() { Name = "North Korea" },
			 new() { Name = "Kosovo" },
			 new() { Name = "Costa Rica" },
			 new() { Name = "Ivory Coast" },
			 new() { Name = "Cuba" },
			 new() { Name = "Kuwait" },
			 new() { Name = "Laos" },
			 new() { Name = "Latvia" },
			 new() { Name = "Lesotho" },
			 new() { Name = "Lithuania" },
			 new() { Name = "Liberia" },
			 new() { Name = "Lebanon" },
			 new() { Name = "Libya" },
			 new() { Name = "Liechtenstein" },
			 new() { Name = "Luxembourg" },
			 new() { Name = "Mauritius" },
			 new() { Name = "Mauritania" },
			 new() { Name = "Madagascar" },
			 new() { Name = "North Macedonia" },
			 new() { Name = "Malawi" },
			 new() { Name = "Malaysia" },
			 new() { Name = "Mali" },
			 new() { Name = "Maldives" },
			 new() { Name = "Malta" },
			 new() { Name = "Morocco" },
			 new() { Name = "Marshall Islands" },
			 new() { Name = "Mexico" },
			 new() { Name = "Mozambique" },
			 new() { Name = "Moldova" },
			 new() { Name = "Monaco" },
			 new() { Name = "Mongolia" },
			 new() { Name = "Myanmar" },
			 new() { Name = "Namibia" },
			 new() { Name = "Nauru" },
			 new() { Name = "Nepal" },
			 new() { Name = "Niger" },
			 new() { Name = "Nigeria" },
			 new() { Name = "Netherlands" },
			 new() { Name = "Nicaragua" },
			 new() { Name = "Germany" },
			 new() { Name = "New Zealand" },
			 new() { Name = "Norway" },
			 new() { Name = "United Arab Emirates (UAE)" },
			 new() { Name = "Oman" },
			 new() { Name = "Pakistan" },
			 new() { Name = "Palau" },
			 new() { Name = "Panama" },
			 new() { Name = "Papua New Guinea" },
			 new() { Name = "Paraguay" },
			 new() { Name = "Peru" },
			 new() { Name = "South Africa" },
			 new() { Name = "South Sudan" },
			 new() { Name = "Poland" },
			 new() { Name = "Portugal" },
			 new() { Name = "Russia" },
			 new() { Name = "Rwanda" },
			 new() { Name = "Romania" },
			 new() { Name = "El Salvador" },
			 new() { Name = "Samoa" },
			 new() { Name = "San Marino" },
			 new() { Name = "Sao Tome and Principe" },
			 new() { Name = "Saudi Arabia" },
			 new() { Name = "Eswatini" },
			 new() { Name = "Seychelles" },
			 new() { Name = "Senegal" },
			 new() { Name = "Saint Vincent and the Grenadines" },
			 new() { Name = "Saint Kitts and Nevis" },
			 new() { Name = "Saint Lucia" },
			 new() { Name = "Serbia" },
			 new() { Name = "Syria" },
			 new() { Name = "Singapore" },
			 new() { Name = "Slovakia" },
			 new() { Name = "Slovenia" },
			 new() { Name = "Solomon Islands" },
			 new() { Name = "Somalia" },
			 new() { Name = "United States of America" },
			 new() { Name = "Sudan" },
			 new() { Name = "Suriname" },
			 new() { Name = "East Timor" },
			 new() { Name = "Sierra Leone" },
			 new() { Name = "Tajikistan" },
			 new() { Name = "Thailand" },
			 new() { Name = "Tanzania" },
			 new() { Name = "Togo" },
			 new() { Name = "Tonga" },
			 new() { Name = "Trinidad and Tobago" },
			 new() { Name = "Tuvalu" },
			 new() { Name = "Tunisia" },
			 new() { Name = "Turkey" },
			 new() { Name = "Turkmenistan" },
			 new() { Name = "Uganda" },
			 new() { Name = "Hungary" },
			 new() { Name = "Uzbekistan" },
			 new() { Name = "Uruguay" },
			 new() { Name = "Federated States of Micronesia" },
			 new() { Name = "Fiji" },
			 new() { Name = "Philippines" },
			 new() { Name = "Finland" },
			 new() { Name = "France" },
			 new() { Name = "Croatia" },
			 new() { Name = "Central African Republic" },
			 new() { Name = "Chad" },
			 new() { Name = "Czech Republic" },
			 new() { Name = "Chile" },
			 new() { Name = "Montenegro" },
			 new() { Name = "Switzerland" },
			 new() { Name = "Sweden" },
			 new() { Name = "Sri Lanka" },
			 new() { Name = "Jamaica" },
			 new() { Name = "Japan" }
		 ];

			context.Countries.AddRange(countries);
			context.SaveChanges();
		}

		if (!context.Cities.Any())
		{
			PostCountry country = context.Countries.Single(c => c.Name == "Ukraine");

			PostCity[] cities =
			[
				new() { Name = "Rivne", CountryId = country.Id },
				new() { Name = "Kyiv", CountryId = country.Id },
				new() { Name = "Lutsk", CountryId = country.Id },
				new() { Name = "Lviv", CountryId = country.Id },
				new() { Name = "Zdolbuniv", CountryId = country.Id },
				new() { Name = "Kostopil", CountryId = country.Id },
				new() { Name = "Bukovel", CountryId = country.Id },
				new() { Name = "Zhytomyr", CountryId = country.Id },
				new() { Name = "Odessa", CountryId = country.Id },
				new() { Name = "Mykolaiv", CountryId = country.Id }
			];

			context.Cities.AddRange(cities);
			context.SaveChanges();
		}

		if (!context.Streets.Any())
		{
			Guid cityId = context.Cities.Single(c => c.Name == "Rivne").Id;

			PostStreet[] streets =
			{
					new(){Name="General Bezruchka", CityId = cityId},
					new(){Name="Beregova", CityId = cityId},
					new(){Name="Maxima Berezovskoho", CityId = cityId},
					new(){Name="Yakova Bychkivskoho", CityId = cityId},
					new(){Name="Basivkutska", CityId = cityId},
					new(){Name="Bila", CityId = cityId},
					new(){Name="Boiarka", CityId = cityId},
					new(){Name="Volynskoi Dyvizii", CityId = cityId},
					new(){Name="Soborna", CityId = cityId},
					new(){Name="16 Lypnia", CityId = cityId},
					new(){Name="Dvoretska", CityId = cityId},
					new(){Name="Dubenska", CityId = cityId},
					new(){Name="Enerhetykiv", CityId = cityId}
			};

			context.Streets.AddRange(streets);
			context.SaveChanges();
		}

		if (!context.PostTypesOfRest.Any())
		{
			PostTypeOfRest[] typesOfRest = {
				new()
				{
					Id = Guid.NewGuid(),
					Name = "Rest with family"
				},
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Ski resorts"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Beach vacation"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Extreme"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Visiting historical places"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Health recreation"
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Sightseeing trips and urban tourism"
                }
            };
			context.PostTypesOfRest.AddRange(typesOfRest);
			context.SaveChanges();
		}
		if(!context.Services.Any())
		{
			Service[] services =
			{
				new(){
					Id = Guid.NewGuid(),
					Name = "Pool",
					Icon = "pool.svg"
				},

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Beach",
                    Icon = "beach.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Breakfast",
                    Icon = "breakfast.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Dinner",
                    Icon = "dinner.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Spa",
                    Icon = "spa.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Sauna",
                    Icon = "sauna.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Jacuzzi",
                    Icon = "jacuzzi.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Gym",
                    Icon = "gym.svg"
                },

				new(){
                    Id = Guid.NewGuid(),
                    Name = "Massage",
                    Icon = "massage.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Animated show",
                    Icon = "show.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Restaurant or cafe",
                    Icon = "cafe-or-restaurant.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Bar",
                    Icon = "bar.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Wi-Fi",
                    Icon = "wi-fi.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Pool for kids",
                    Icon = "kids-pool.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Organization of excursions",
                    Icon = "travel-walk.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Kids clubs",
                    Icon = "kids-room.svg"
                },

                new(){
                    Id = Guid.NewGuid(),
                    Name = "Room service",
                    Icon = "clean.svg"
                }
            };

			context.Services.AddRange(services);
			context.SaveChanges();
		}

	}
	public async static void SeedUserAndRoleData(this IApplicationBuilder app)
	{
		using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();

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
				await userManager.AddToRoleAsync(user, Roles.Admin);
			}
		}
	}
}
