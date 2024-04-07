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
    public class CategoryRepository(BookingDbContext bookingDbContext) : ICategoryRepository
    {
        public async Task<CategoryEntity> GetCategoryOfId(Guid id)
        {
            var category = await bookingDbContext.Category.FirstOrDefaultAsync(x => x.Id == id);

            if (category != null)
            {
                return category;
            }
            else
            {
                throw new InvalidOperationException("Такої категорії не існує!");
            }
        }

        public async Task<List<CategoryEntity>> GetAllAsync()
        {
            var categories = await bookingDbContext.Category.ToListAsync();
            return categories;
        }


        public async Task AddNewCategory(CategoryEntity entity)
        {
            var check = await bookingDbContext.Category.FirstOrDefaultAsync(x => x.Name == entity.Name);

            if (check == null)
            {
                bookingDbContext.Category.Add(entity);
                await bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Категорія з таким ім'ям вже існує!");
            }
        }

        public async Task EditCategory(CategoryEntity updatedCategory)
        {
            var existingCategory = await bookingDbContext.Category.FirstOrDefaultAsync(x => x.Id == updatedCategory.Id);

            if (existingCategory != null)
            {
                existingCategory.Name = updatedCategory.Name;              
                await bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Редагування неможливе. Такої категорії не існує!");
            }
        }

        public async Task DeleteCategory(Guid id)
        {
            var category = await bookingDbContext.Category.FirstOrDefaultAsync(x => x.Id == id);

            if (category != null)
            {
                bookingDbContext.Category.Remove(category);
                await bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Видалення немодливе. Такої категорії не існує!");
            }
        }    
    }
}
