﻿using Booking.Application.Common.Interfaces.Post;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;

namespace Booking.Application.Posts.GetPostPostTypesOfRestList;

public class GetPostTypesOfRestListQueryHandler(
	IPostTypeOfRestRepository postTypeOfRestRepository)
	: IRequestHandler<GetPostTypesOfRestListQuery, ErrorOr<List<PostTypeOfRest>>>
{
	public async Task<ErrorOr<List<PostTypeOfRest>>> Handle(
		GetPostTypesOfRestListQuery request, CancellationToken cancellationToken)
	{
		var getPostTypeOfRestResult = await postTypeOfRestRepository.GetListTypeOfRentAsync();

		if (getPostTypeOfRestResult == null)
			return Error.NotFound("Error in loading Type Of Rest list");
		
		return getPostTypeOfRestResult;
	}
}
