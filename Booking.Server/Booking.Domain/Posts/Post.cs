﻿using Booking.Domain.Chat;
using Booking.Domain.Users;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Domain.Posts;

public class Post
{
	public Guid Id { get; set; }

	public required string Name { get; set; }

	public Guid CategoryId { get; set; }


	[ForeignKey(nameof(CategoryId))]
	public PostCategory? Category { get; set; }

	public Guid StreetId { get; set; }

	[ForeignKey(nameof(StreetId))]
	public PostStreet? Street { get; set; }

	public int ZipCode { get; set; }

	public int? NumberOfGuests { get; set; }

	//public string? Description { get; set; }

	public decimal Price { get; set; }

	public int? Discount { get; set; }

	public float Rate { get; set; }

	public Guid UserId { get; set; }

	[ForeignKey(nameof(UserId))]
	public User? User { get; set; }

	public bool IsArhive { get; set; }

	public bool IsActive { get; set; }

	public ICollection<PostImage>? ImagesPost { get; set; }

	public ICollection<ChatRoom>? ChatRooms { get; set; }

	public required DateTime PostAt { get; set; }

	public DateTime? EditAt { get; set; }

	public ICollection<Room>? Rooms { get; set; }

    public ICollection<PostPostTypeOfRest>? PostPostTypesOfRest { get; set; }

    public ICollection<PostService>? Service { get; set; }

	public ICollection<PostBooking>? Bookings { get; set; }

    public ICollection<Feedback>? ReceivedFeedbacks { get; set; }

}
