using Booking.Domain.Entity;
using Booking.Domain.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Common.Persistence;

public class BookingDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
	public BookingDbContext() : base() { }
	public BookingDbContext(DbContextOptions<BookingDbContext> options) : base(options) { }

	public DbSet<CategoryEntity> Categories { get; set; }

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);
	}
}
