using Booking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Common.Interfaces.Locations
{
    public interface IStreetRepository<TEntity> where TEntity : class
    {
        Task<StreetEntity> GetStreetOfId(Guid id);
        Task<List<StreetEntity>> GetAllAsync();
        Task AddNewStreet(StreetEntity entity);
        Task DeleteStreet(Guid id);
        Task EditStreet(StreetEntity updatedStreet);
        IQueryable<TEntity> GetIQueryable();
    }
}
