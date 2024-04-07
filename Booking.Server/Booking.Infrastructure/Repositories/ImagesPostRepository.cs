using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Infrastructure.Repositories
{
    public class ImagesPostRepository: IImagesPostRepository
    {
        private List<ImagesPostEntity> _imagesPosts;

        public ImagesPostRepository()
        {
            _imagesPosts = new List<ImagesPostEntity>();
        }

        public Task<ImagesPostEntity> GetByIdAsync(Guid id)
        {
            return Task.FromResult(_imagesPosts.FirstOrDefault(p => p.PostId == id));
        }

        public Task<IEnumerable<ImagesPostEntity>> GetAllAsync()
        {
            return Task.FromResult<IEnumerable<ImagesPostEntity>>(_imagesPosts);
        }

        public Task<IEnumerable<ImagesPostEntity>> GetByPostIdAsync(Guid postId)
        {
            return Task.FromResult(_imagesPosts.Where(p => p.PostId == postId));
        }

        public Task AddAsync(ImagesPostEntity entity)
        {
            _imagesPosts.Add(entity);
            return  Task.CompletedTask;
        }

        public Task UpdateAsync(ImagesPostEntity entity)
        {
            var existingEntity = _imagesPosts.FirstOrDefault(p => p.PostId == entity.PostId);
            if (existingEntity != null)
            {
                existingEntity.NameImage = entity.NameImage;
                existingEntity.PriorityImage = entity.PriorityImage;
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var entityToRemove = _imagesPosts.FirstOrDefault(p => p.PostId == id);
            if (entityToRemove != null)
            {
                _imagesPosts.Remove(entityToRemove);
            }
            return Task.CompletedTask;
        }
    }
}
