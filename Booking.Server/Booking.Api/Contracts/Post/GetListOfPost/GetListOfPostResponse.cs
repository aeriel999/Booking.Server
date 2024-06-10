﻿namespace Booking.Api.Contracts.Post.GetListOfPost;
public record GetListOfPostResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string Category { get; set; }
    public string User { get; set; }
    public decimal Price { get; set; }
    public string ImagePost { get; set; }
    public DateTime PostAt { get; set; }
}

