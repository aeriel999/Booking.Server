using Booking.Application.Common.Interfaces.Common;
using Booking.Domain.Users;
using Microsoft.IdentityModel.Tokens;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Booking.Infrastructure.Services.Common;

public class ImageStorageService : IImageStorageService
{
	public async Task<string> AddAvatarAsync(User user, byte[] file)
	{
		var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images", "avatars");
 
		//Delete Avatar if it already exist
		if (!user.Avatar.IsNullOrEmpty())
		{
			var delFilePath = Path.Combine(uploadFolderPath, user.Avatar!);

			if (File.Exists(delFilePath))
				File.Delete(delFilePath);
		}

		return await SaveImageAsync(file, uploadFolderPath, 600, 600);
	}

	public async Task<string> SavePostImageInStorageAsync(byte[] file)
	{
		var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images", "posts");

		return await SaveImageAsync(file, uploadFolderPath, 1200, 1200);
	}

	public async Task<string> SaveImageAsync(
		byte[] file, string uploadFolderPath, int weight, int height)
	{
		string imageName = Path.GetRandomFileName() + ".webp";

		if (!Directory.Exists(uploadFolderPath))
			Directory.CreateDirectory(uploadFolderPath);

		string dirSaveImage = Path.Combine(uploadFolderPath, imageName);

		using (var image = Image.Load(file))
		{
			image.Mutate(x =>
			{
				x.Resize(new ResizeOptions
				{
					Size = new Size(weight, height),
					Mode = ResizeMode.Max
				});
			});

			using (var stream = File.Create(dirSaveImage))
			{
				await image.SaveAsync(stream, new WebpEncoder());
			}
		}

		return imageName;
	}


	//ToDo delete avatar
	public async Task DeleteImageAsync(string imageName, string path)
	{
		await Task.Run
		(() =>
		{
			var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images", path);

			var delFilePath = Path.Combine(uploadFolderPath, imageName);

			File.Delete(delFilePath);
		});
	}

}
