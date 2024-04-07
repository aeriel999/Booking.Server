using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Booking.Application.Common.Interfaces.Locations;
using Booking.Domain.Models;
using Booking.Infrastructure.Common.Persistence;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class TownRepository(BookingDbContext bookingDbContext) : ITownRepository
{
    public async Task<TownEntity> GetTownOfId(Guid id)
    {
        var town = await bookingDbContext.Towns.FirstOrDefaultAsync(x => x.Id == id);

        if (town != null)
        {
            return town;
        }
        else
        {
            throw new InvalidOperationException("Такого міста не існує!");
        }
    }

    public async Task<List<TownEntity>> GetAllAsync()
    {
        var towns = await bookingDbContext.Towns.ToListAsync();
        return towns;
    }

    public async Task AddNewTown(TownEntity entity)
    {
        var check= await bookingDbContext.Towns.FirstOrDefaultAsync(x=>x.NameTown==entity.NameTown);

        if (check == null)
        {
            bookingDbContext.Towns.Add(entity);
            await bookingDbContext.SaveChangesAsync();
        }
        else
        {           
            throw new InvalidOperationException("Місто з таким ім'ям вже існує!");
        }
    }

    public async Task DeleteTown(Guid id)
    {
        var town = await bookingDbContext.Towns.FirstOrDefaultAsync(x => x.Id == id);

        if (town != null)
        {
            bookingDbContext.Towns.Remove(town);
            await bookingDbContext.SaveChangesAsync();
        }
        else
        {
            throw new InvalidOperationException("Видалення немодливе. Такого міста не існує!");
        }        
    }

    public async Task EditTown(TownEntity updatedTown)
    {
        var existingTown = await bookingDbContext.Towns.FirstOrDefaultAsync(x => x.Id == updatedTown.Id);

        if (existingTown != null)
        {
            existingTown.NameTown = updatedTown.NameTown;
            existingTown.CountryId = updatedTown.CountryId;
            await bookingDbContext.SaveChangesAsync();
        }
        else
        {
            throw new InvalidOperationException("Редагування неможливе. Такого міста не існує!");
        }
    }

}
