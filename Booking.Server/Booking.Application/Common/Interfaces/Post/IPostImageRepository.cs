using Booking.Domain.Posts;
using ErrorOr;

namespace Booking.Application.Common.Interfaces.Post;

public interface IPostImageRepository
{
	Task CraetePostImageAsync(PostImage image);


	Task DeletePostImageListByNameAsync(List<PostImage> imageList);


	Task CraetePostImageListAsync(List<PostImage> image);


	ErrorOr<PostImage> GetImageByName(string imageName);
}
