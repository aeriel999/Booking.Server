using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using Booking.Domain.Posts;
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
	public async Task ReadMessagesByChatRoomIdAsync(Guid chatRoomId, Guid userId)
	{
		var messages = await _dbSet
			.Where(m => m.ChatRoomId == chatRoomId && m.UserId != userId && !m.IsRead)
            .ToArrayAsync();

		foreach(var message in messages)
			message.IsRead = true;
		

	  _dbSet.UpdateRange(messages);
	  await SaveUserMessageAsync();

    }

	public async Task UpdateMessageAsync(UserMessage userMessage)
	{
		await Task.Run
		(() =>
			{
				_dbSet.Attach(userMessage);
				context.Entry(userMessage).State = EntityState.Modified;
			});
	}
}

