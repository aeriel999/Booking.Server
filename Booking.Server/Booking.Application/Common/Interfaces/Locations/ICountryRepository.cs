using Booking.Domain.Models;
using Booking.Domain.Users;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Locations;

public interface ICountryRepository
{
	Task<List<CountryEntity>> GetAllAsync();	
}
