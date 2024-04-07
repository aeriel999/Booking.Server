using Booking.Application.Common.Interfaces.Common;
using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Models;
using Booking.Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Posts
{
    public class PostsCommandHandler : IRequestHandler<PostListCommand, List<PostEntity>>, 
        IRequestHandler<GetPostByIdCommand, PostEntity>,
        IRequestHandler<AddPostCommand, Unit>,
        IRequestHandler<DeletePostCommand, Unit>,
        IRequestHandler<EditPostCommand, Unit>

    {
        private readonly IPostRepository<PostEntity> _postRepository;
        private readonly IImageStorageService _imageStorageService;


        public PostsCommandHandler(IPostRepository<PostEntity> postRepository, IImageStorageService imageStorageService)
        {
            _postRepository = postRepository;
            _imageStorageService = imageStorageService;
        }

        public async Task<List<PostEntity>> Handle(PostListCommand request, CancellationToken cancellationToken)
        {
            return await _postRepository.GetAllAsync();
        }

        public async Task<PostEntity> Handle(GetPostByIdCommand request, CancellationToken cancellationToken)
        {
            return await _postRepository.GetPostOfId(request.postId);
        }

        public async Task<Unit> Handle(AddPostCommand request, CancellationToken cancellationToken)
        {       

            await _postRepository.AddNewPost(request.entity);            

            return Unit.Value;
        }

        public async Task<Unit> Handle(EditPostCommand request, CancellationToken cancellationToken)
        {
            await _postRepository.EditPost(request.entity);
            return Unit.Value;
        }

        public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            await _postRepository.DeletePost(request.id);
            return Unit.Value;
        }       
    }   
}
