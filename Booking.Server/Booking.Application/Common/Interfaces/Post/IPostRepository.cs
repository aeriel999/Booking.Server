using Booking.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Common.Interfaces.Post
{
    public interface IPostRepository<TEntity> where TEntity : class
    {
        Task<PostEntity> GetPostOfId(Guid id);
        Task<List<PostEntity>> GetAllAsync();
        Task AddNewPost(PostEntity entity);
        Task DeletePost(Guid id);
        Task EditPost(PostEntity updatePost);
        IQueryable<TEntity> GetIQueryable();
    }
}
