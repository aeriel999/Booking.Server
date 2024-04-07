using Booking.Application.Common.Interfaces.Locations;
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
    public class PostRepository<TEntity> : IPostRepository<TEntity> where TEntity : class
    {
        private readonly BookingDbContext _bookingDbContext;

        public PostRepository(BookingDbContext bookingDbContext)
        {
            _bookingDbContext = bookingDbContext;
        }

        public IQueryable<TEntity> GetIQueryable()
        {
            return _bookingDbContext.Set<TEntity>().AsQueryable();
        }

        public async Task<PostEntity> GetPostOfId(Guid id)
        {
            var post = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == id);

            if (post != null)
            {
                return post;
            }
            else
            {
                throw new InvalidOperationException("Такого оголошення не існує!");
            }
        }

        public async Task<List<PostEntity>> GetAllAsync()
        {
            var posts = await _bookingDbContext.Posts.ToListAsync();
            return posts;
        }


        public async Task AddNewPost(PostEntity entity)
        {
            var check = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == entity.Id);

            if (check == null)
            {
                _bookingDbContext.Posts.Add(entity);
                await _bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Таке оголошення уже існує!");
            }
        }

        public async Task DeletePost(Guid id)
        {
            var post = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == id);

            if (post != null)
            {
                _bookingDbContext.Posts.Remove(post);
                await _bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Видалення немодливе. Такого оголошення не існує!");
            }
        }

        public async Task EditPost(PostEntity updatedPost)
        {
            var existingPost = await _bookingDbContext.Posts.FirstOrDefaultAsync(x => x.Id == updatedPost.Id);

            if (existingPost != null)
            {
                existingPost.NamePost = updatedPost.NamePost;
                existingPost.CategoryId=updatedPost.CategoryId;
                existingPost.Description=updatedPost.Description;
                existingPost.TypeOfRent=updatedPost.TypeOfRent;
                existingPost.StreetId = updatedPost.StreetId;
                existingPost.NumberOfBuilding = updatedPost.NumberOfBuilding;
                existingPost.NumberOfRooms = updatedPost.NumberOfRooms;
                existingPost.Area = updatedPost.Area;
                existingPost.Area = updatedPost.Area;
                existingPost.UserId = updatedPost.UserId;
                existingPost.isArhive=updatedPost.isArhive;
                existingPost.NearlyСost = updatedPost.NearlyСost;
                await _bookingDbContext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Редагування неможливе. Такого оголошення не існує!");
            }
        }
    }
}
