using Booking.Api.Contracts.Users.Common.ChangePassword;
using Booking.Api.Contracts.Users.Realtor.Edit;
using Booking.Api.Contracts.Users.Realtor.Get;
using Booking.Api.Contracts.Users.Realtor.Get.Information;
using Booking.Api.Contracts.Users.User.Edit;
using Booking.Api.Infrastructure;
using Booking.Application.Users.Common.ChangePassword;
using Booking.Application.Users.Realtor.GetRealtorById;
using Booking.Application.Users.Realtor.EditRealtor;
using Booking.Application.Users.Realtor.GetRealtorsList;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Booking.Api.Contracts.Users.Common.ChangeAvatar;
using Booking.Application.Users.Client.EditUser;
using Booking.Application.Users.Common.ChangeAvatar;
using Booking.Application.Users.Client.DeleteUser;
using Booking.Api.Contracts.Users.Common.ChangeProfileHeader;
using Booking.Application.Users.Common.ChangeProfileHeader;
using Booking.Application.Users.Realtor.GetRealtorsFilteredList;
using Booking.Application.Users.Client.GetListOfAllUsersForAdmin;
using Booking.Api.Contracts.Users.User.GetListOfAllUsersForAdmin;
using Booking.Application.Common.Behaviors;
using Booking.Api.Contracts.Users.Common.BlockUserByAdmin;
using Booking.Application.Users.Common.BlockUserByAdmin;
using Booking.Api.Contracts.Users.Common.UnBlockUserByAdmin;
using Booking.Application.Users.Common.UnBlockUserByAdmin;
using Booking.Application.Users.Common.DeleteUserByAdmin;
using Booking.Application.Users.Realtor.GetListOfAllRealtorsForAdmin;
using Booking.Api.Contracts.Users.Realtor.GetListOfAllRealtorsForAdmin;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UserController(ISender mediatr, IMapper mapper, IConfiguration configuration) : ApiController
{
    [AllowAnonymous]
    [HttpGet("get-realtors-list")]
    public async Task<IActionResult> GetRealtorsListAsync()
    {
        var getRealtorsListResult = await mediatr.Send(new GetRealtorsListQuery());

        return getRealtorsListResult.Match(
            getRealtorsListResult => Ok(mapper.Map<List<GetRealtorResponse>>(getRealtorsListResult)),
            errors => Problem(errors));
    }


    [AllowAnonymous]
    [HttpGet("get-realtors-filtered-list")]
    public async Task<IActionResult> GetRealtorsFilteredListAsync(
		[FromQuery] Guid? Category, Guid? Country, Guid? City)
    {
        var getRealtorsListResult = await mediatr.Send(new GetRealtorsFilteredListQuery(Category, Country, City));

        return getRealtorsListResult.Match(
            getRealtorsListResult => Ok(mapper.Map<List<GetRealtorResponse>>(getRealtorsListResult)),
            errors => Problem(errors));
    }


    [AllowAnonymous]
    [HttpGet("get-realtor-by-id-{id}")]
    public async Task<IActionResult> GetRealtrByIdAsync([FromRoute] Guid id)
    {
        var realtor = await mediatr.Send(new GetRealtorByIdQuery(id));

        return realtor.Match(
            realtor => Ok(mapper.Map<GetInformationAboutRealtorResponse>(realtor)),
            errors => Problem(errors));
    }


    [HttpPost("realtor-profile")]
	public async Task<IActionResult> EditRealtorPrifileInfoAsync(EditRealtorPrifileInfoRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

		var image = new byte[request.Avatar == null ? 0 : request.Avatar.Length];

		if (request.Avatar != null && request.Avatar.Length != 0)
		{
			using MemoryStream memoryStream = new MemoryStream();
			await request.Avatar.CopyToAsync(memoryStream);

			image = memoryStream.ToArray();
		}

		var editResult = await mediatr.Send(
			mapper.Map<EditRealtorPrifileInfoCommand>((request, Guid.Parse(userId), baseUrl, image)));

		return editResult.Match(
			authResult => Ok(mapper.Map<EditRealtorPrifileInfoResponse>(editResult.Value)),
			errors => Problem(errors));
	}

	[HttpPost("reupload-avatar")]
	public async Task<IActionResult> ChangeAvatarAsync(ChangeAvatarRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		using MemoryStream memoryStream = new MemoryStream();

		await request.Avatar.CopyToAsync(memoryStream);

		var image = memoryStream.ToArray();

		var changeAvatarResult = await mediatr.Send(new ChangeAvatarCommand(image, Guid.Parse(userId)));

		return changeAvatarResult.Match(
		   changeAvatarResult => Ok(changeAvatarResult),
		   errors => Problem(errors));
	}

	[HttpPost("upload-header")]
	public async Task<IActionResult> ChangeProfileHeaderAsync(ChangeProfileHeaderRequest request)
	{
		string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		using MemoryStream memoryStream = new MemoryStream();

		await request.ProfileHeaderImage.CopyToAsync(memoryStream);

		var image = memoryStream.ToArray();

		var changProfileHeaderResult = await mediatr.Send(new ChangeProfileHeaderCommand(image, Guid.Parse(userId)));

		return changProfileHeaderResult.Match(
		   changProfileHeaderResult => Ok(changProfileHeaderResult),
		   errors => Problem(errors));
	}

	[HttpPost("change-password")]
    public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest request)
    {
        string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var changeEmailResult = await mediatr.Send(mapper.Map<ChangePasswordCommand>((request, Guid.Parse(userId))));

        return changeEmailResult.Match(
            changeEmailResult => Ok(),
            errors => Problem(errors));
    }
 

    [HttpDelete("delete-user")]
    public async Task<IActionResult> DeleteUserAsync()
    {
        string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var deleteUser = await mediatr.Send(new DeleteUserCommand(Guid.Parse(userId)));

        return deleteUser.Match(
            deleteUser => Ok(deleteUser),
            errors => Problem(errors));
    }


    [HttpPut("edit-user-profile")]
    public async Task<IActionResult> EditUserProfileAsync([FromBody] EditUserProfileRequest request)
    {
        var baseUrl = configuration.GetRequiredSection("HostSettings:ClientURL").Value;

        string userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var updateUser = await mediatr.Send(mapper.Map<EditUserProfileCommand>((request,userId,baseUrl)));

        return updateUser.Match(
            updateUser => Ok(mapper.Map<EditUserProfileResponse>(updateUser)),
            errors => Problem(errors));
    }


    [HttpGet("get-list-of-all-users")]
	[Authorize(Roles = "admin")] 
	public async Task<IActionResult> GetListOfAllUsersForAdminAsync([FromQuery] int page, int sizeOfPage)
    {
        var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

        var userRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

        var getListOfAllUsersForAdminResult = await mediatr.Send(
            new GetListOfAllUsersForAdminQuery(Guid.Parse(userId), userRole, page, sizeOfPage));

		var result = getListOfAllUsersForAdminResult.Value != null 
				? mapper.Map<PagedList<GetListOfAllUsersForAdminResponse>>(getListOfAllUsersForAdminResult.Value!)
				: null;

		return getListOfAllUsersForAdminResult.Match(
            getListOfPostsForModerationResult => Ok(result),
            errors => Problem(errors));
    }

	[HttpPost("block-user-by-admin")]
	[Authorize(Roles = "admin")]  
	public async Task<IActionResult>BlockUserByAdminAsync(BlockUserByAdminRequest request)
	{
		var currentUserId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var userRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

		var blockUserByAdminResult = await mediatr.Send(
			new BlockUserByAdminCommand(Guid.Parse(currentUserId), userRole, request.UserId));

		return blockUserByAdminResult.Match(
			blockUserByAdminResult => Ok(),
			errors => Problem(errors));
	}

	[HttpPost("unblock-user-by-admin")]
	[Authorize(Roles = "admin")]
	public async Task<IActionResult> UnBlockUserByAdminAsync(DeleteUserByAdminRequest request)
	{
		var currentUserId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var userRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

		var unblockUserByAdminResult = await mediatr.Send(
			new UnBlockUserByAdminCommand(Guid.Parse(currentUserId), userRole, request.UserId));

		return unblockUserByAdminResult.Match(
			unblockUserByAdminResult => Ok(),
			errors => Problem(errors));
	}

	[HttpPost("delete-user-by-admin")]
	[Authorize(Roles = "admin")]
	public async Task<IActionResult> DeleteUserByAdminAsync(DeleteUserByAdminRequest request)
	{
		var currentUserId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var userRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

		var deleteUserByAdminResult = await mediatr.Send(
			new DeleteUserByAdminCommand(Guid.Parse(currentUserId), userRole, request.UserId));

		return deleteUserByAdminResult.Match(
			deleteUserByAdminResult => Ok(),
			errors => Problem(errors));
	}

	[HttpGet("get-list-of-all-realtors")]
	[Authorize(Roles = "admin")]
	public async Task<IActionResult> GetListOfAllRealtorsForAdminAsync([FromQuery] int page, int sizeOfPage)
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

		var userRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

		var getListOfAllRealtorsForAdminResult = await mediatr.Send(
			new GetListOfAllRealtorsForAdminQuery(Guid.Parse(userId), userRole, page, sizeOfPage));

		var result = getListOfAllRealtorsForAdminResult.Value != null
				? mapper.Map<PagedList<GetListOfAllRealtorsForAdminResult>>(getListOfAllRealtorsForAdminResult.Value!)
				: null;

		return getListOfAllRealtorsForAdminResult.Match(
			getListOfAllRealtorsForAdminResult => Ok(result),
			errors => Problem(errors));
 
	}
}
