using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Booking.Infrastructure.Services.Common
{
	public class UserIdProvider : IUserIdProvider
	{
		public string? GetUserId(HubConnectionContext connection)
		{
			return connection.User?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
		}
	}
}



