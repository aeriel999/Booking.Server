using Booking.Domain.Models;
using MediatR;

namespace Booking.Application.Location.Street
{
    public record StreetListCommand() : IRequest<List<StreetEntity>>;    
}
