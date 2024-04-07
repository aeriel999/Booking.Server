using Booking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Common.Interfaces.Post
{
    public interface IImagesPostRepository
    {
        Task<ImagesPostEntity> GetByIdAsync(Guid id);
        Task<IEnumerable<ImagesPostEntity>> GetAllAsync();
        Task<IEnumerable<ImagesPostEntity>> GetByPostIdAsync(Guid postId);
        Task AddAsync(ImagesPostEntity entity);
        Task UpdateAsync(ImagesPostEntity entity);
        Task DeleteAsync(Guid id);
    }
}
