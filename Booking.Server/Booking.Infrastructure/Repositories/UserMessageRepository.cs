using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class UserMessageRepository(BookingDbContext context) : IUserMessageRepository
{
	private readonly DbSet<UserMessage> _dbSet = context.Set<UserMessage>();

	public async Task CreateUserMessageAsync(UserMessage userMessage)
	{
		await _dbSet.AddAsync(userMessage);
	}

	public async Task SaveUserMessageAsync()
	{
		await context.SaveChangesAsync();
	}

	public async Task<List<UserMessage>> GetUserMessagesByChatRoomIdAsync(Guid chatRoomId)
	{ 
		return await _dbSet
						.Where(m => m.ChatRoomId == chatRoomId)
						.ToListAsync();
	}
}

