using Booking.Domain.Models;
using Booking.Domain.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Common.Persistence;

public class BookingDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
	public BookingDbContext() : base() { }
	public BookingDbContext(DbContextOptions<BookingDbContext> options) : base(options) { }	
	public DbSet<CategoryEntity> Category { get; set; }
	public DbSet<CountryEntity> Country { get; set; }
	public DbSet<TownEntity> Towns { get; set; }
	//public DbSet<StreetEntity> Streets { get; set; }
	//public DbSet<ImagesPostEntity> Images { get; set; }
	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);
	}
}
