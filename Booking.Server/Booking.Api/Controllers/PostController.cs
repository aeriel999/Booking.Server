using Booking.Api.Contracts.CrudOperation.Post;
using Booking.Api.Contracts.CrudOperation.Town;
using Booking.Api.Infrastructure;
using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Application.Location.Town;
using Booking.Application.Posts;
using Booking.Domain.Models;
using Booking.Domain.TypeExtensions;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;

namespace Booking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController
        (ISender mediatr, IMapper mapper, 
        IImagesPostRepository _imagesPostRepository, 
        IImageStorageService _imageStorageService) : ApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIdPost(Guid id)
        {
            var post = await mediatr.Send(new GetPostByIdCommand(id));

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpGet("GetAllPosts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var list = await mediatr.Send(new PostListCommand());
            return Ok(list);
        }

        [HttpPost("AddNewPost")]
        public async Task<IActionResult> AddNewTown([FromForm] AddPostDto dtoPost)
        { 
            var post = new PostEntity
            {
                NamePost = dtoPost.NamePost,
                CategoryId = dtoPost.CategoryId,
                Description = dtoPost.Description,
                TypeOfRent = (Domain.Models.TypeOfRent)dtoPost.TypeOfRent,
                StreetId = dtoPost.StreetId,
                NumberOfBuilding = dtoPost.NumberOfBuilding,
                NumberOfRooms = dtoPost.NumberOfRooms,
                Area = dtoPost.Area,
                UserId = dtoPost.UserId,                
                NearlyСost = dtoPost.NearlyСost
            };
            await mediatr.Send(new AddPostCommand(post));

            if(dtoPost.Images!=null)
            {
                foreach (var image in dtoPost.Images)
                {
                    var result = await _imageStorageService.SaveImageAsync(image);

                    if (result.IsSuccess())
                    {
                        var nameImage = result.Value;
                        var img = new ImagesPostEntity
                        {
                            NameImage = nameImage,
                            PostId = post.Id,
                            PriorityImage = dtoPost.Images.Count
                        };

                        await _imagesPostRepository.AddAsync(img);
                    }                   
                }
                await mediatr.Send(new EditPostCommand(post));
            }

            return Ok();
        }

    }
}
