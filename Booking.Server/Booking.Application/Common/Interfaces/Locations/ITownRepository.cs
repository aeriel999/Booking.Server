using Booking.Domain.Models;
using Booking.Domain.Users;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Locations;

public interface ITownRepository
{
    Task<TownEntity> GetTownOfId(Guid id);
    Task<List<TownEntity>> GetAllAsync();
    Task AddNewTown(TownEntity entity);
    Task DeleteTown(Guid id);
    Task EditTown(TownEntity updatedTown);
}
