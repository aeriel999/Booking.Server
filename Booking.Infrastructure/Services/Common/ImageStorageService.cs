using Booking.Application.Common.Interfaces.Common;
using Booking.Domain.Users;
using ErrorOr;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Booking.Infrastructure.Services.Common;
public class ImageStorageService : IImageStorageService
{
	public async Task<string> AddAvatarAsync(User user, IFormFile file)
	{
		string imageName = Path.GetRandomFileName() + ".webp";

		var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images", "avatars");

		if (!Directory.Exists(uploadFolderPath))
		{
			Directory.CreateDirectory(uploadFolderPath);
		}

		if (!user.Avatar.IsNullOrEmpty())
		{
			var delFilePath = Path.Combine(uploadFolderPath, user.Avatar!);

			if (File.Exists(delFilePath))
				File.Delete(delFilePath);
		}

		string dirSaveImage = Path.Combine(uploadFolderPath, imageName);

		using (MemoryStream ms = new())
		{
			await file.CopyToAsync(ms);

			using var image = Image.Load(ms.ToArray());
			image.Mutate(x =>
			{
				x.Resize(new ResizeOptions
				{
					//ToDo In what size save an avatar
					Size = new Size(1200, 1200),
					Mode = ResizeMode.Max
				});
			});

			using var stream = File.Create(dirSaveImage);
			await image.SaveAsync(stream, new WebpEncoder());
		}

		return imageName;
	}

	public async Task<ErrorOr<string>> SaveImageAsync(IFormFile image)
	{
		var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images", "apartments");

		if (!Directory.Exists(uploadFolderPath))
			Directory.CreateDirectory(uploadFolderPath);

		try
		{
			var fileName = Path.GetRandomFileName();

			//ToDo MAke web format

			var webFileName = fileName + ".png";

			var filePath = Path.Combine(uploadFolderPath, webFileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
				await image.CopyToAsync(stream);

			using (var i = Image.Load(filePath))
			{
				i.Mutate(x => x.Resize(new ResizeOptions
				{
					Size = new Size(1200, 1200),
					Mode = ResizeMode.Max
				}));

				i.Save(filePath);
			}

			return webFileName;
		}
		catch (Exception ex)
		{
			return Error.Unexpected("Image is not saved ", ex.Message.ToString());
		}
	}

	public async Task<ErrorOr<Deleted>> DeleteImageAsync(string imageName)
	{
		try
		{
			var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "images", "apartments");

			var delFilePath = Path.Combine(uploadFolderPath, imageName);

			File.Delete(delFilePath);

			return Result.Deleted;
		}
		catch (Exception ex)
		{
			return Error.Unexpected(ex.Message.ToString());
		}
	}

}
