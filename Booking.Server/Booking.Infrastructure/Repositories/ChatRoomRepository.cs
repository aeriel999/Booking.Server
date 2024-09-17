using Ardalis.Specification;
using Booking.Application.Chat.GetChatRoomsListForClient;
using Booking.Application.Common.Interfaces.Chat;
using Booking.Domain.Chat;
using Booking.Domain.Posts;
using Booking.Infrastructure.Common.Persistence;
using ErrorOr;
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
    public async Task<ChatRoom?> GetIncludeChatRoomByIdAsync(Guid roomId)
    {
        return await _dbSet
            .Where(c => c.ChatRoomId == roomId)
			.Include(c => c.Realtor)
			.Include(c => c.Post!.ImagesPost)
            .FirstOrDefaultAsync();
    }

    public async Task<List<ChatRoom>> GetChatRoomListWithMessagesByRealtorIdAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.RealtorId == realtorId)
			.Include(c => c.UserMessages)
			.ToListAsync();
	}


	//public async Task<List<ChatRoom>> GetChatRoomListByRealtorIdAsync(Guid realtorId)
	//{
	//	return await _dbSet
	//		.Where(c => c.RealtorId == realtorId)
	//		.ToListAsync();
	//}


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
			.Include(c => c.Client)
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

    public async Task<List<ChatRoomForClient>> GetListOfChatRoomsForClientByRealtorId(Guid realtorId, Guid clientId)
    {
        return await _dbSet
            .Where(c => c.RealtorId == realtorId && c.ClientId == clientId)
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
		return await _dbSet
			.Where(c => c.ClientId == userId && c.PostId == postId)
			.Include(c => c!.Post!.User)
			.Include(c => c!.Post!.ImagesPost)
			.FirstOrDefaultAsync();
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
	public async Task<bool> CheckChatForClientIsExist(Guid userId, Guid postId)
	{
		var response = false;

		var chatRoom = await _dbSet.FirstOrDefaultAsync(c => c.ClientId == userId && c.PostId == postId);

		if (chatRoom != null) response = true;

		return response;
	}


	public async Task UpdateChatRoomAsync(ChatRoom chatRoom)
	{
		await Task.Run
		(() =>
			{
				_dbSet.Attach(chatRoom);
				context.Entry(chatRoom).State = EntityState.Modified;
			});
	}

	public async Task<int> GetNumberOfUnreadMessagesAsync(Guid realtorId)
	{
		return await _dbSet
			.Where(c => c.RealtorId == realtorId)
			.Include(c => c.UserMessages)
			.SelectMany(c => c.UserMessages!)
			.Where(m => m.UserId != realtorId)
			.CountAsync(m => !m.IsRead);
	}


	public async Task<List<UserMessage>> GetListOfUnreadMessagesAsync(Guid chatRoomId)
	{
		return await _dbSet
			.Where(c => c.ChatRoomId == chatRoomId)
			.Include(c => c.UserMessages)
			.SelectMany(c => c.UserMessages!)                       
			.Where(m => !m.IsRead)                                 
			.ToListAsync();                                        
	}

}
