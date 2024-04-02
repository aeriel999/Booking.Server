using Booking.Domain.Constants;
using Booking.Domain.Users;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Booking.Domain.Models;

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
					await userManager.AddToRoleAsync(user, Roles.Admin);
				}
			}

            if (!context.Category.Any())
            {
                CategoryEntity[] categories = new CategoryEntity[]
                {
                    new CategoryEntity{Name="Будинок"},
                    new CategoryEntity{Name="Квартира"},
                    new CategoryEntity{Name="Котедж"},
                    new CategoryEntity{Name="Готель"},
                    new CategoryEntity{Name="Хостел"},
                    new CategoryEntity{Name="Готель для побачень"}
                };

                context.Category.AddRange(categories);
                context.SaveChanges();
            }

            if (!context.Country.Any())
            {
                CountryEntity[] countries = new CountryEntity[]
       {
                             new CountryEntity{NameCountry="Україна"},
                             new CountryEntity{NameCountry="Австралія"},
                             new CountryEntity{NameCountry="Австрія"},
                             new CountryEntity{NameCountry="Азербайджан"},
                             new CountryEntity{NameCountry="Албанія"},
                             new CountryEntity{NameCountry="Алжир"},
                             new CountryEntity{NameCountry="Ангола"},
                             new CountryEntity{NameCountry="Андорра"},
                             new CountryEntity{NameCountry="Антигуа та Барбуда"},
                             new CountryEntity{NameCountry="Аргентина"},
                             new CountryEntity{NameCountry="Афганістан"},
                             new CountryEntity{NameCountry="Багамські Острови"},
                             new CountryEntity{NameCountry="Бангладеш"},
                             new CountryEntity{NameCountry="Барбадос"},
                             new CountryEntity{NameCountry="Бахрейн"},
                             new CountryEntity{NameCountry="Беліз"},
                             new CountryEntity{NameCountry="Бельгія"},
                             new CountryEntity{NameCountry="Бенін"},
                             new CountryEntity{NameCountry="Білорусь"},
                             new CountryEntity{NameCountry="Болгарія"},
                             new CountryEntity{NameCountry="Болівія"},
                             new CountryEntity{NameCountry="Боснія та Герцеговина"},
                             new CountryEntity{NameCountry="Ботсвана"},
                             new CountryEntity{NameCountry="Бразилія"},
                             new CountryEntity{NameCountry="Бруней"},
                             new CountryEntity{NameCountry="Буркіна-Фасо"},
                             new CountryEntity{NameCountry="Бурунді"},
                             new CountryEntity{NameCountry="Бутан"},
                             new CountryEntity{NameCountry="Вануату"},
                             new CountryEntity{NameCountry="Ватикан"},
                             new CountryEntity{NameCountry="В’єтнам"},
                             new CountryEntity{NameCountry="Велика Британія"},
                             new CountryEntity{NameCountry="Венесуела"},
                             new CountryEntity{NameCountry="Вірменія"},
                             new CountryEntity{NameCountry="Габон"},
                             new CountryEntity{NameCountry="Гаїті"},
                             new CountryEntity{NameCountry="Гайяна"},
                             new CountryEntity{NameCountry="Гамбія"},
                             new CountryEntity{NameCountry="Гана"},
                             new CountryEntity{NameCountry="Гватемала"},
                             new CountryEntity{NameCountry="Гвінея"},
                             new CountryEntity{NameCountry="Гвінея-Бісау"},
                             new CountryEntity{NameCountry="Гондурас"},
                             new CountryEntity{NameCountry="Гренада"},
                             new CountryEntity{NameCountry="Греція"},
                             new CountryEntity{NameCountry="Грузія"},
                             new CountryEntity{NameCountry="Данія"},
                             new CountryEntity{NameCountry="Демократична Республіка Конго"},
                             new CountryEntity{NameCountry="Джибуті"},
                             new CountryEntity{NameCountry="Домініка"},
                             new CountryEntity{NameCountry="Домініканська Республіка"},
                             new CountryEntity{NameCountry="Еквадор"},
                             new CountryEntity{NameCountry="Екваторіальна Гвінея"},
                             new CountryEntity{NameCountry="Еритрея"},
                             new CountryEntity{NameCountry="Естонія"},
                             new CountryEntity{NameCountry="Ефіопія"},
                             new CountryEntity{NameCountry="Єгипет"},
                             new CountryEntity{NameCountry="Ємен"},
                             new CountryEntity{NameCountry="Замбія"},
                             new CountryEntity{NameCountry="Зімбабве"},
                             new CountryEntity{NameCountry="Ізраїль"},
                             new CountryEntity{NameCountry="Індія"},
                             new CountryEntity{NameCountry="Індонезія"},
                             new CountryEntity{NameCountry="Ірак"},
                             new CountryEntity{NameCountry="Іран"},
                             new CountryEntity{NameCountry="Ірландія"},
                             new CountryEntity{NameCountry="Ісландія"},
                             new CountryEntity{NameCountry="Іспанія"},
                             new CountryEntity{NameCountry="Італія"},
                             new CountryEntity{NameCountry="Йорданія"},
                             new CountryEntity{NameCountry="Кабо-Верде"},
                             new CountryEntity{NameCountry="Казахстан"},
                             new CountryEntity{NameCountry="Камбоджа"},
                             new CountryEntity{NameCountry="Камерун"},
                             new CountryEntity{NameCountry="Канада"},
                             new CountryEntity{NameCountry="Катар"},
                             new CountryEntity{NameCountry="Кенія"},
                             new CountryEntity{NameCountry="Киргизстан"},
                             new CountryEntity{NameCountry="Китай"},
                             new CountryEntity{NameCountry="Кірибаті"},
                             new CountryEntity{NameCountry="Колумбія"},
                             new CountryEntity{NameCountry="Коморські Острови"},
                             new CountryEntity{NameCountry="Конго"},
                             new CountryEntity{NameCountry="Корея Південна (Республіка Корея)"},
                             new CountryEntity{NameCountry="Корея Північна (КНДР)"},
                             new CountryEntity{NameCountry="Косово"},
                             new CountryEntity{NameCountry="Коста-Ріка"},
                             new CountryEntity{NameCountry="Кот-д’Івуар"},
                             new CountryEntity{NameCountry="Куба"},
                             new CountryEntity{NameCountry="Кувейт"},
                             new CountryEntity{NameCountry="Лаос"},
                             new CountryEntity{NameCountry="Латвія"},
                             new CountryEntity{NameCountry="Лесото"},
                             new CountryEntity{NameCountry="Литва"},
                             new CountryEntity{NameCountry="Ліберія"},
                             new CountryEntity{NameCountry="Ліван"},
                             new CountryEntity{NameCountry="Лівія"},
                             new CountryEntity{NameCountry="Ліхтенштейн"},
                             new CountryEntity{NameCountry="Люксембург"},
                             new CountryEntity{NameCountry="Маврикій"},
                             new CountryEntity{NameCountry="Мавританія"},
                             new CountryEntity{NameCountry="Мадагаскар"},
                             new CountryEntity{NameCountry="Македонія Північна"},
                             new CountryEntity{NameCountry="Малаві"},
                             new CountryEntity{NameCountry="Малайзія"},
                             new CountryEntity{NameCountry="Малі"},
                             new CountryEntity{NameCountry="Мальдіви"},
                             new CountryEntity{NameCountry="Мальта"},
                             new CountryEntity{NameCountry="Марокко"},
                             new CountryEntity{NameCountry="Маршаллові Острови"},
                             new CountryEntity{NameCountry="Мексика"},
                             new CountryEntity{NameCountry="Мозамбік"},
                             new CountryEntity{NameCountry="Молдова"},
                             new CountryEntity{NameCountry="Монако"},
                             new CountryEntity{NameCountry="Монголія"},
                             new CountryEntity{NameCountry="М’янма"},
                             new CountryEntity{NameCountry="Намібія"},
                             new CountryEntity{NameCountry="Науру"},
                             new CountryEntity{NameCountry="Непал"},
                             new CountryEntity{NameCountry="Нігер"},
                             new CountryEntity{NameCountry="Нігерія"},
                             new CountryEntity{NameCountry="Нідерланди"},
                             new CountryEntity{NameCountry="Нікарагуа"},
                             new CountryEntity{NameCountry="Німеччина"},
                             new CountryEntity{NameCountry="Нова Зеландія"},
                             new CountryEntity{NameCountry="Норвегія"},
                             new CountryEntity{NameCountry="Об’єднані Арабські Емірати (ОАЕ)"},
                             new CountryEntity{NameCountry="Оман"},
                             new CountryEntity{NameCountry="Пакистан"},
                             new CountryEntity{NameCountry="Палау"},
                             new CountryEntity{NameCountry="Панама"},
                             new CountryEntity{NameCountry="Папуа-Нова Гвінея"},
                             new CountryEntity{NameCountry="Парагвай"},
                             new CountryEntity{NameCountry="Перу"},
                             new CountryEntity{NameCountry="Південна Африка"},
                             new CountryEntity{NameCountry="Південний Судан"},
                             new CountryEntity{NameCountry="Польща"},
                             new CountryEntity{NameCountry="Португалія"},
                             new CountryEntity{NameCountry="Росія"},
                             new CountryEntity{NameCountry="Руанда"},
                             new CountryEntity{NameCountry="Румунія"},
                             new CountryEntity{NameCountry="Сальвадор"},
                             new CountryEntity{NameCountry="Самоа"},
                             new CountryEntity{NameCountry="Сан-Марино"},
                             new CountryEntity{NameCountry="Сан-Томе і Прінсіпі"},
                             new CountryEntity{NameCountry="Саудівська Аравія"},
                             new CountryEntity{NameCountry="Свазіленд"},
                             new CountryEntity{NameCountry="Сейшельські Острови"},
                             new CountryEntity{NameCountry="Сенегал"},
                             new CountryEntity{NameCountry="Сент-Вінсент і Гренадини"},
                             new CountryEntity{NameCountry="Сент-Кіттс і Невіс"},
                             new CountryEntity{NameCountry="Сент-Люсія"},
                             new CountryEntity{NameCountry="Сербія"},
                             new CountryEntity{NameCountry="Сирія"},
                             new CountryEntity{NameCountry="Сінгапур"},
                             new CountryEntity{NameCountry="Словаччина"},
                             new CountryEntity{NameCountry="Словенія"},
                             new CountryEntity{NameCountry="Соломонові Острови"},
                             new CountryEntity{NameCountry="Сомалі"},
                             new CountryEntity{NameCountry="Сполучені Штати Америки"},
                             new CountryEntity{NameCountry="Судан"},
                             new CountryEntity{NameCountry="Сурінам"},
                             new CountryEntity{NameCountry="Східний Тімор"},
                             new CountryEntity{NameCountry="Сьєрра-Леоне"},
                             new CountryEntity{NameCountry="Таджикістан"},
                             new CountryEntity{NameCountry="Таїланд"},
                             new CountryEntity{NameCountry="Танзанія"},
                             new CountryEntity{NameCountry="Того"},
                             new CountryEntity{NameCountry="Тонга"},
                             new CountryEntity{NameCountry="Тринідад і Тобаго"},
                             new CountryEntity{NameCountry="Тувалу"},
                             new CountryEntity{NameCountry="Туніс"},
                             new CountryEntity{NameCountry="Туреччина"},
                             new CountryEntity{NameCountry="Туркменістан"},
                             new CountryEntity{NameCountry="Уганда"},
                             new CountryEntity{NameCountry="Угорщина"},
                             new CountryEntity{NameCountry="Узбекистан"},
                             new CountryEntity{NameCountry="Уругвай"},
                             new CountryEntity{NameCountry="Федеративні Штати Мікронезії"},
                             new CountryEntity{NameCountry="Фіджі"},
                             new CountryEntity{NameCountry="Філіппіни"},
                             new CountryEntity{NameCountry="Фінляндія"},
                             new CountryEntity{NameCountry="Франція"},
                             new CountryEntity{NameCountry="Хорватія"},
                             new CountryEntity{NameCountry="Центральноафриканська Республіка"},
                             new CountryEntity{NameCountry="Чад"},
                             new CountryEntity{NameCountry="Чехія"},
                             new CountryEntity{NameCountry="Чилі"},
                             new CountryEntity{NameCountry="Чорногорія"},
                             new CountryEntity{NameCountry="Швейцарія"},
                             new CountryEntity{NameCountry="Швеція"},
                             new CountryEntity{NameCountry="Шрі-Ланка"},
                             new CountryEntity{NameCountry="Ямайка"},
                             new CountryEntity{NameCountry="Японія"}
                };

                context.Country.AddRange(countries);
                context.SaveChanges();
            }

            //if(!context.Towns.Any())
            //{
            //    TownEntity[] towns = new TownEntity[]
            //    {
            //        new TownEntity(){NameTown="Рівне", StreetsId=new StreetEntity},
            //        new TownEntity(){NameTown="Київ"},
            //        new TownEntity(){NameTown="Луцьк"},
            //        new TownEntity(){NameTown="Львів"},
            //        new TownEntity(){NameTown="Здолбунів"},
            //        new TownEntity(){NameTown="Костопіль"},
            //        new TownEntity(){NameTown="Буковель"},
            //        new TownEntity(){NameTown="Житомир"},
            //        new TownEntity(){NameTown="Одеса"},
            //        new TownEntity(){NameTown="Миколаїв"}
            //    };

            //    context.Towns.AddRange(towns);
            //    context.SaveChanges();
            //}

            //if (!context.Streets.Any())
            //{
            //    StreetEntity[] streets = new StreetEntity[]
            //    {
            //        new StreetEntity(){NameStreet="Генерала Безручка"},
            //        new StreetEntity(){NameStreet="Берегова"},
            //        new StreetEntity(){NameStreet="Максима Березовського"},
            //        new StreetEntity(){NameStreet="Якова Бичківського"},
            //        new StreetEntity(){NameStreet="Басівкутська"},
            //        new StreetEntity(){NameStreet="Біла"},
            //        new StreetEntity(){NameStreet="Боярка"},
            //        new StreetEntity(){NameStreet="Волинської дивізії"},
            //        new StreetEntity(){NameStreet="Соборна"},
            //        new StreetEntity(){NameStreet="16 липня"},
            //        new StreetEntity(){NameStreet="Дворецька"},
            //        new StreetEntity(){NameStreet="Дубенська"},
            //        new StreetEntity(){NameStreet="Енергетиків"}
            //    };
            //}


        }
    }
}
