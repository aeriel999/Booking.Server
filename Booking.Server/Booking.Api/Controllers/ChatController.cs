using Booking.Api.Infrastructure;
using Booking.Application.Chat.GetChatRoomsList;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Booking.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class ChatController(ISender mediatr) : ApiController
{

	//[HttpPost("create")]
	//public async Task<IActionResult> CreateChatAsync(CreateChatRequest request)
	//{
	//	string userId = UserName.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;

	//	var createChatResult = await mediatr.Send(mapper.Map<CreateChatCommand>((request, userId)));

	//	return createChatResult.Match(
	//		createChatResult => Ok(createChatResult),
	//		errors => Problem(errors));
	//}

	[HttpGet("chat-list")]
	public async Task<IActionResult> GetListOfChatsAsync()
	{
		var userId = User.Claims.First(u => u.Type == ClaimTypes.NameIdentifier).Value;
		var useRole = User.Claims.First(u => u.Type == ClaimTypes.Role).Value;

		var getListOfChatRoomsResult = await mediatr.Send(
			new GetChatRoomsListQuery(Guid.Parse(userId), useRole));

		//ToDo Make response
		return getListOfChatRoomsResult.Match(
			getListOfChatRoomsResult => Ok(getListOfChatRoomsResult),
			errors => Problem(errors));
	}

	 
}