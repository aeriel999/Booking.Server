using Ardalis.Specification.EntityFrameworkCore;
using Booking.Application.Common.Interfaces.Post;
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
    public class ImagesPostRepository(BookingDbContext bookingDbContext) : IImagesPostRepository
    {     
        public async Task<ImagesPostEntity> GetByIdAsync(Guid id)
        {
            return await bookingDbContext.Images.FirstOrDefaultAsync(p => p.PostId == id);
        }

        public async Task<IEnumerable<ImagesPostEntity>> GetAllAsync()
        {           
            
            return await bookingDbContext.Images.ToListAsync();
        }

        public async Task<IEnumerable<ImagesPostEntity>> GetByPostIdAsync(Guid postId)
        {
            return await bookingDbContext.Images.Where(p => p.PostId == postId).ToListAsync();
        }

        public async Task AddAsync(ImagesPostEntity entity)
        {
            bookingDbContext.Images.Add(entity);
           
            await bookingDbContext.SaveChangesAsync();
           
        }

        public Task UpdateAsync(ImagesPostEntity entity)
        {
            var existingEntity = bookingDbContext.Images.FirstOrDefault(p => p.PostId == entity.PostId);
            if (existingEntity != null)
            {
                existingEntity.NameImage = entity.NameImage;
                existingEntity.PriorityImage = entity.PriorityImage;
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var entityToRemove = bookingDbContext.Images.FirstOrDefault(p => p.PostId == id);
            if (entityToRemove != null)
            {
                bookingDbContext.Images.Remove(entityToRemove);
            }
            return Task.CompletedTask;
        }
    }
}
