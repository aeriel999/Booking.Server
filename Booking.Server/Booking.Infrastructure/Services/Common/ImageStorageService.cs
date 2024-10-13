using Booking.Application.Common.Interfaces.Common;
using Booking.Domain.Users;
using Microsoft.AspNetCore.Hosting;
using Microsoft.IdentityModel.Tokens;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Booking.Infrastructure.Services.Common;

public class ImageStorageService(IWebHostEnvironment environment) : IImageStorageService
{
	private string UploadsPath => Path.Combine(environment.WebRootPath, "uploads");

	private void EnsureDirectoryExists()
	{
		if (!Directory.Exists(UploadsPath))
		{
			Directory.CreateDirectory(UploadsPath);
		}

	}
	public async Task<string> AddAvatarAsync(User user, byte[] file)
	{
		EnsureDirectoryExists();

		var uploadFolderPath = Path.Combine(UploadsPath, "avatars");
 
		//Delete Avatar if it already exist
		if (!user.Avatar.IsNullOrEmpty())
		{
			var delFilePath = Path.Combine(uploadFolderPath, user.Avatar!);

			if (File.Exists(delFilePath))
				File.Delete(delFilePath);
		}

		return await SaveImageAsync(file, uploadFolderPath, 600, 600);
	}

	public async Task<string> AddProfileHeaderImageAsync(User user, byte[] file)
	{
		EnsureDirectoryExists();

		var uploadFolderPath = Path.Combine(UploadsPath, "avatars");

		//Delete Avatar if it already exist
		if (!user.ProfileHeaderImage.IsNullOrEmpty())
		{
			var delFilePath = Path.Combine(uploadFolderPath, user.ProfileHeaderImage!);

			if (File.Exists(delFilePath))
				File.Delete(delFilePath);
		}

		return await SaveImageAsync(file, uploadFolderPath, 1200, 1200);
	}

	public async Task<string> SavePostImageInStorageAsync(byte[] file)
	{
		EnsureDirectoryExists();

		var uploadFolderPath = Path.Combine(UploadsPath, "posts");

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


	public void DeleteImage(string imageName, string path)
	{
		EnsureDirectoryExists();

		var uploadFolderPath = Path.Combine(UploadsPath, path);

		var delFilePath = Path.Combine(uploadFolderPath, imageName);

		if (File.Exists(delFilePath))
			File.Delete(delFilePath);
	}

}
