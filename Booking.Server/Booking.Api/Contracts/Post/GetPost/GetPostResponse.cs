using Booking.Domain.Chat;
using Booking.Domain.Posts;
using Booking.Domain.Users;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking.Api.Contracts.Post.GetPost
{
    public record GetPostResponse
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public string Category { get; set; }

        public string? Description { get; set; }

        public string PostTypeOfRent { get; set; }

        public string Street { get; set; }

        public string? BuildingNumber { get; set; }

        public int? NumberOfRooms { get; set; }

        public int? Area { get; set; }

        public string User { get; set; }

        public bool IsArhive { get; set; }

        public decimal Price { get; set; }

        public string ImagePost { get; set; }

        public ICollection<Guid>? ChatRoomsId { get; set; }
    }
}
