using Ardalis.Specification;
using Booking.Application.Chat.GetChatRoomsListForClient;
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


	public async Task<List<ChatRoom>> GetChatRoomListByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.RealtorId == realtorId)
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

	public async Task<List<ChatRoom>?> GetChatRoomListByPostId(Guid postId)
	{
		return await _dbSet
			.Where(c => c.PostId == postId)
			.Include(c => c.UserMessages)
			.ToListAsync();
	}

	public async Task<List<Guid>> GetRealtorChatRoomsIdByClient(Guid clientId)
	{
		return await _dbSet
			.Where(c => c.ClientId == clientId)
			.Select(c => c.RealtorId)
			.Distinct()
			.ToListAsync();
	}

    public async Task<List<ChatRoomForClient>> GetListOfChatRoomsForClientByRealtorId(Guid realtorId)
    {
        return await _dbSet
            .Where(c => c.RealtorId == realtorId)
			.Include(c => c.Post)
			.ThenInclude(c => c!.ImagesPost)
            .Select(c => new ChatRoomForClient()
			{
				ChatRoomId = c.ChatRoomId,
				PostImage = c.Post!.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name,
				PostName = c.Post!.Name,
				HasUnreadMessages = false,
				UnreadMessages = null
			})
            .Distinct()
            .ToListAsync();
    }

	public async Task<ChatRoom?> GetChatRoomByPostIdAndUserIdAsync(Guid userId, Guid postId)
	{
		return await _dbSet.Where(c => c.ClientId == userId && c.PostId == postId).FirstOrDefaultAsync();
	}

	public async Task<List<Guid>?> GetChatRoomIdListByRealtorIdAsync(Guid realtorId)
	{
		var list = await _dbSet
			.Where(c => c.RealtorId == realtorId)
			.ToListAsync();

		return list.Select(c => c.ChatRoomId).ToList();  
	}

	public async Task<List<Guid>?> GetChatRoomIdListByUserIdAsync(Guid userId)
	{
		var list = await _dbSet
			.Where(c => c.ClientId == userId)
			.ToListAsync();

		return list.Select(c => c.ChatRoomId).ToList();
	}
}
