﻿namespace Booking.Api.Contracts.Post.GetListOfPost;
public record GetListOfPostResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; }
    public required string User { get; set; }

    public required string City { get; set; }
    public required string Country { get; set; }
    public float Rating { get; set; }
    public int CountOfRating { get; set; }

    public decimal Price { get; set; }
    public required string ImagePost { get; set; }
    public DateTime PostAt { get; set; }
    public required string[] TypesOfRest { get; set; }
}
