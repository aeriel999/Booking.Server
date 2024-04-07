using Booking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Common.Interfaces.Locations
{
    public interface ICategoryRepository
    {
        Task<CategoryEntity> GetCategoryOfId(Guid id);
        Task<List<CategoryEntity>> GetAllAsync();
        Task AddNewCategory(CategoryEntity entity);
        Task DeleteCategory(Guid id);
        Task EditCategory(CategoryEntity updatedTown);
    }
}
