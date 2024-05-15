using Ardalis.Specification;
using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using Booking.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Repositories;

public class ChatRoomRepository(BookingDbContext context) : IChatRoomRepository
{
	private readonly DbSet<ChatRoom> _dbSet = context.Set<ChatRoom>();

	public async Task CreateChatRoomAsync(ChatRoom chatRoom)
	{
		await _dbSet.AddAsync(chatRoom);
	}

	public async Task SaveChatRoomAsync()
	{
		await context.SaveChangesAsync();
	}

	public async Task<ChatRoom?> GetChatRoomByIdAsync(Guid roomId)
	{
		return await _dbSet.FindAsync(roomId);
	}

	public async Task<List<ChatRoom>> GetChatRoomListWithMessagesByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.RealtorId == realtorId)
			.Include(c => c.UserMessages)
			.ToListAsync();
	}

	public async Task<List<ChatRoom>> GetChatRoomListWithMessagesByUserIdAsync(Guid userId)
	{
		return await _dbSet
			.Where(c => c.ClientId == userId)
			 .Include(c => c.UserMessages)
			.ToListAsync();
	}

	public async Task<ChatRoom?> GetChatRoomForUserIdAndPostIdAsync(Guid userId, Guid postId)
	{
		return await _dbSet
				.Where(c => c.PostId == postId && c.ClientId == userId)
				.FirstOrDefaultAsync();
	}
}
