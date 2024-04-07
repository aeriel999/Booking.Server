using Ardalis.Specification;
using Booking.Application.Common.Interfaces;
using Booking.Application.Common.Interfaces.Locations;
using Booking.Domain.Models;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Infrastructure.Repositories
{
    public class StreetRepository<TEntity> : IStreetRepository<TEntity> where TEntity : class
    {
        private readonly BookingDbContext bookingDbContext;

        public StreetRepository(BookingDbContext bookingDbContext)
        {
            this.bookingDbContext = bookingDbContext;
        }

        public IQueryable<TEntity> GetIQueryable()
        {
            return bookingDbContext.Set<TEntity>().AsQueryable();
        }

        public async Task<StreetEntity> GetStreetOfId(Guid id)
        {
            var street = await bookingDbContext.Streets.FirstOrDefaultAsync(x => x.Id == id);

            if (street != null)
            {
                return street;
            }
            else
            {
                throw new InvalidOperationException("Такої вулиці не існує!");
            }
        }

        public async Task<List<StreetEntity>> GetAllAsync()
        {
            var streets = await bookingDbContext.Streets.ToListAsync();
            return streets;
        }


        public async Task AddNewStreet(StreetEntity entity)
        {
            var check = await bookingDbContext.Streets.FirstOrDefaultAsync(x => x.NameStreet == entity.NameStreet);

            if (check == null)
            {
                bookingDbContext.Streets.Add(entity);
                await bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Вулиця з таким ім'ям вже існує!");
            }
        }

        public async Task DeleteStreet(Guid id)
        {
            var street = await bookingDbContext.Streets.FirstOrDefaultAsync(x => x.Id == id);

            if (street != null)
            {
                bookingDbContext.Streets.Remove(street);
                await bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Видалення немодливе. Такої вулиці не існує!");
            }
        }

        public async Task EditStreet(StreetEntity updatedStreet)
        {
            var existingStreet = await bookingDbContext.Streets.FirstOrDefaultAsync(x => x.Id == updatedStreet.Id);

            if (existingStreet != null)
            {
                existingStreet.NameStreet = updatedStreet.NameStreet;
                existingStreet.TownId = updatedStreet.TownId;
                await bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Редагування неможливе. Такої вулиці не існує!");
            }
        }    
    }
}
