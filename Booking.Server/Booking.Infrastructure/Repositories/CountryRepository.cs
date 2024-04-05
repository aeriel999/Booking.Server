using Ardalis.Specification.EntityFrameworkCore;
using Booking.Application.Common.Interfaces.Locations;
using Booking.Domain.Models;
using Booking.Infrastructure.Common.Persistence;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class CountryRepository(BookingDbContext bookingDbContext) : ICountryRepository
{
    public async Task<List<CountryEntity>> GetAllAsync()
    {
        var roles = await bookingDbContext.Country.ToListAsync();
        return roles;
    }
}
