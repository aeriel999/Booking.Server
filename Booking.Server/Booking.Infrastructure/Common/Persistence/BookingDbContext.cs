﻿using Booking.Domain.Chat;
using Booking.Domain.Posts;
using Booking.Domain.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Common.Persistence;

public class BookingDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
	public BookingDbContext() : base() { }

	public BookingDbContext(DbContextOptions<BookingDbContext> options) : base(options) { }	

	public DbSet<PostCategory> Categories { get; set; }

	public DbSet<PostCountry> Countries { get; set; }

	public DbSet<PostCity> Cities { get; set; }

	public DbSet<PostStreet> Streets { get; set; }

    public DbSet<Post> Posts { get; set; }

	public DbSet<PostImage> Images { get; set; }

	public DbSet<ChatRoom> ChatRooms { get; set; }

	public DbSet<UserMessage> UserMessages { get; set; }

	public DbSet<PostTypeOfRent> PostTypeOfRent { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);

		//builder.Entity<ChatRoom>()
		//   .HasOne(c => c.Post)
		//   .WithMany(p => p.ChatRooms)
		//   .HasForeignKey(c => c.PostId)
		//   .OnDelete(DeleteBehavior.ClientNoAction);

		//builder.Entity<UserMessage>()
		//   .HasOne(c => c.ChatRoom)
		//   .WithMany(r => r.UserMessages)
		//   .HasForeignKey(c => c.ChatRoomId)
		//   .OnDelete(DeleteBehavior.ClientNoAction);

		builder.Entity<Post>()
			.HasMany(c => c.ChatRooms)
			.WithOne(u => u.Post)
			.OnDelete(DeleteBehavior.ClientCascade);

		builder.Entity<ChatRoom>()
			.HasMany(c => c.UserMessages)
			.WithOne(u => u.ChatRoom)
			.OnDelete(DeleteBehavior.ClientCascade);

		builder.Entity<User>()
			.HasMany(u => u.Posts)
			.WithOne(p => p.User)
			.OnDelete(DeleteBehavior.ClientCascade);

		builder.Entity<PostCity>()
		   .HasOne(c => c.Country)
		   .WithMany(p => p.Cities)
		   .HasForeignKey(c => c.CountryId)
		   .OnDelete(DeleteBehavior.ClientNoAction);

		builder.Entity<PostStreet>()
		   .HasOne(c => c.City)
		   .WithMany(p => p.Streets)
		   .HasForeignKey(c => c.CityId)
		   .OnDelete(DeleteBehavior.ClientNoAction);

		builder.Entity<Post>()
			.HasMany(c => c.ImagesPost)
			.WithOne(u => u.Post)
			.HasForeignKey(i => i.PostId)
			.OnDelete(DeleteBehavior.ClientCascade);

		builder.Entity<PostImage>()
		 .HasOne(pi => pi.Post)
		 .WithMany(p => p.ImagesPost)
		 .HasForeignKey(pi => pi.PostId)
		 .OnDelete(DeleteBehavior.Cascade);

		builder.Entity<PostCategory>()
			.HasMany(u => u.Posts)
			.WithOne(p => p.Category)
			.OnDelete(DeleteBehavior.ClientNoAction);

		builder.Entity<Post>()
		   .HasOne(c => c.Street)
		   .WithMany(p => p.Posts)
		   .HasForeignKey(c => c.StreetId)
		   .OnDelete(DeleteBehavior.ClientNoAction);

		builder.Entity<PostTypeOfRent>()
			.HasMany(u => u.Posts)
			.WithOne(p => p.PostTypeOfRent)
			.OnDelete(DeleteBehavior.ClientNoAction);

		builder.Entity<User>()
			.HasMany(u => u.ReceivedFeedbacks)
			.WithOne(u => u.Realtor)
			.HasForeignKey(u => u.RealtorId)
            .OnDelete(DeleteBehavior.ClientCascade);

        builder.Entity<User>()
            .HasMany(u => u.SentFeedbacks)
            .WithOne(u => u.Client)
            .HasForeignKey(u => u.ClientId)
            .OnDelete(DeleteBehavior.ClientCascade);

    }
}
