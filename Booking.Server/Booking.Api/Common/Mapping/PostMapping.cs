using Booking.Api.Contracts.Post.CreatePost;
using Booking.Api.Contracts.Post.GetArchivedPostListForRealtor;
using Booking.Api.Contracts.Post.GetCategories;
using Booking.Api.Contracts.Post.GetCities;
using Booking.Api.Contracts.Post.GetCountries;
using Booking.Api.Contracts.Post.GetFilteredList;
using Booking.Api.Contracts.Post.GetListOfPost;
using Booking.Api.Contracts.Post.GetPost;
using Booking.Api.Contracts.Post.GetPostForEditing;
using Booking.Api.Contracts.Post.GetPostListByRealtorId;
using Booking.Api.Contracts.Post.GetPostListForRealtor;
using Booking.Api.Contracts.Post.GetPostWithMostDiscount;
using Booking.Api.Contracts.Post.GetPostWithMostRating;
using Booking.Api.Contracts.Post.GetPostPostTypesOfRest;
using Booking.Api.Contracts.Post.GetStreets;
using Booking.Api.Contracts.Post.GetTypeOfPost;
using Booking.Api.Contracts.Post.GetTypeOfRest;
using Booking.Application.Common.Behaviors;
using Booking.Application.Posts.CreatePost;
using Booking.Application.Posts.EditPost;
using Booking.Application.Posts.GetCities;
using Booking.Application.Posts.GetFilteredList;
using Booking.Application.Posts.GetNameOfPost;
using Booking.Application.Posts.GetPostByName;
using Booking.Application.Posts.GetStreets;
using Booking.Domain.Posts;
using Mapster;
using Booking.Api.Contracts.Post.EditPost;
using Booking.Application.Posts.SendFeedback;
using Booking.Api.Contracts.Post.SentFeedback;
using Booking.Api.Contracts.Post.Feedback;
using Booking.Api.Contracts.Post.GetRealtorByUserFeedback;
using Booking.Api.Contracts.Post.GetServicesList;
using Booking.Application.Posts.CreateRoom;

namespace Booking.Api.Common.Mapping;

public class PostMapping : IRegister
{
	public void Register(TypeAdapterConfig config)
	{
		config.NewConfig<(
			CreatePostRequest createPostRequest, Guid UserId, List<byte[]> Images, byte[] MainImage), CreatePostCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest.Images, src => src.Images)
		.Map(dest => dest.MainImage, src => src.MainImage)
		.Map(dest => dest, src => src.createPostRequest);

		config.NewConfig<(
			CreateRoomRequest createPostRequest, Guid UserId, byte[] MainImage), CreateRoomCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest.MainImage, src => src.MainImage)
		.Map(dest => dest, src => src.createPostRequest);

		config.NewConfig<Post, GetPostResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Name, src => src.Name)
			.Map(desp => desp.CategoryName, src => src.Category!.Name)
			.Map(desp => desp.CategoryId, src => src.Category!.Id)
			.Map(desp => desp.CountryName, src => src.Street!.City!.Country!.Name)
			.Map(desp => desp.CountryId, src => src.Street!.City!.CountryId)
			.Map(desp => desp.CityName, src => src.Street!.City!.Name)
			.Map(desp => desp.CityId, src => src.Street!.City!.Id)
			.Map(desp => desp.StreetName, src => src.Street!.Name)
			.Map(desp => desp.StreetId, src => src.Street!.Id)
			.Map(desp => desp.ZipCode, src => src.ZipCode)
			.Map(desp => desp.Discount, src => src.Discount)
			.Map(desp => desp.NumberOfGuests, src => src.NumberOfGuests)
			.Map(desp => desp.UserName, src => $"{src.User!.FirstName} {src.User.LastName}")
			.Map(desp => desp.UserId, src => src.UserId)
			.Map(desp => desp.Price, src => src.Price)
			.Map(desp => desp.Rate, src => src.Rate)
			.Map(desp => desp.CountOfFeedbacks, src => src.ReceivedFeedbacks == null ? 0 : src.ReceivedFeedbacks.Count)
			.Map(desp => desp.ImagePostList, src =>
			 src.ImagesPost != null ? src.ImagesPost.OrderBy(img => img.Priority)
			 .Select(img => img.Name).ToArray() : Array.Empty<string>())
			.Map(desp => desp.TypesOfRest, src => src.PostPostTypesOfRest!.Select(p => p.PostTypeOfRest!.Name))
			//.Map(desp => desp.Services, src => src.Service!.Select(p => p.Service!.Name))
			.Map(desp => desp.Services, src =>  src.Service != null ?  src.Service!.Select(service => new GetService
			{
				Name =  service.Service!.Name,
				Icon = "default"
			}).ToList() : null) 
			.Map(desp => desp.RoomList, src => src.Rooms!.Select(room => new EditRoom
			{
				Id = room.Id,
				NumberOfGuests = room.NumberOfGuests,
				NumberOfRooms = room.NumberOfRooms,
				Discount = room.Discount,
				Price = room.Price,
				MainImage = room.MainImage
			}).ToList());


		config.NewConfig<Post, GetPostListByRealtorIdResponse>()
            .Map(desp => desp.Id, src => src.Id)
            .Map(src => src.Name, src => src.Name)
            .Map(desp => desp.ImagePost, src => src.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name);


        config.NewConfig<Post, GetListOfPostResponse>()
            .Map(desp => desp.Category, src => src.Category!.Name)
            .Map(desp => desp.User, src => $"{src.User!.FirstName} {src.User.LastName}")
			.Map(desp => desp.City, src => src.Street!.City!.Name)
			.Map(desp => desp.Country, src => src.Street!.City!.Country!.Name)
			.Map(desp => desp.Rating, src => src.Rate)
			.Map(desp => desp.CountOfRating, src => src.ReceivedFeedbacks!.Count)
            .Map(desp => desp.ImagePost, src => src.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name)
            .Map(desp => desp.TypesOfRest, src => src.PostPostTypesOfRest!.Select(p => p.PostTypeOfRest!.Name));


        config.NewConfig<PagedList<GetListOfPostResponse>, PagedList<Post>>()
			.Map(desp => desp.items, src => src.items.Adapt<List<GetListOfPostResponse>>());


        config.NewConfig<(GetFilteredListRequest request, string name), GetNameOfPostQuery>()
            .Map(dest => dest.Category, src => src.request.Category)
            .Map(dest => dest.Country, src => src.request.Country)
            .Map(dest => dest.City, src => src.request.City)
            .Map(dest => dest.Realtor, src => src.request.Realtor)
            .Map(dest => dest.Name, src => src.name);


        config.NewConfig<(GetFilteredListRequest request, int page, int sizeOfPage), GetFilteredListQuery>()
			.Map(dest => dest.Category, src => src.request.Category)
			.Map(dest => dest.Country, src => src.request.Country)
			.Map(dest => dest.City, src => src.request.City)
			.Map(dest => dest.Realtor, src => src.request.Realtor)
			.Map(dest => dest.Page, src => src.page)
            .Map(dest => dest.SizeOfPage, src => src.sizeOfPage);


		config.NewConfig<Post, GetPostWithMostRatingResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Name, src => src.Name)
			.Map(desp => desp.Rating, src => src.Rate)
			.Map(desp => desp.Image, src => src.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name)
			.Map(desp => desp.Country, src => src.Street!.City!.Country!.Name)
			.Map(desp => desp.City, src => src.Street!.City!.Name);


        config.NewConfig<Post, GetPostWithMostDiscountResponse>()
            .Map(desp => desp.Id, src => src.Id)
            .Map(desp => desp.Name, src => src.Name)
            .Map(desp => desp.Rating, src => src.Rate)
            .Map(desp => desp.Image, src => src.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name)
            .Map(desp => desp.Country, src => src.Street!.City!.Country!.Name)
            .Map(desp => desp.City, src => src.Street!.City!.Name)
            .Map(desp => desp.Discount, src => src.Discount);


        config.NewConfig<(SendFeedbackRequest request, string id), SendFeedbackCommand>()
            .Map(dest => dest.Text, src => src.request.Text)
            .Map(dest => dest.Rating, src => src.request.Rating)
            .Map(dest => dest.PostId, src => src.request.PostId)
            .Map(dest => dest.ClientId, src => Guid.Parse(src.id));


        config.NewConfig<Feedback, GetFeedbackResponse>()
            .Map(desp => desp.Text, src => src.Text)
            .Map(desp => desp.Rating, src => src.Rating)
            .Map(desp => desp.ClientId, src => src.ClientId)
            .Map(desp => desp.Client, src => src.Client!.Email)
            .Map(desp => desp.FeedbackAt, src => src.FeedbackAt);


        config.NewConfig<PagedList<GetFeedbackResponse>, PagedList<Feedback>>()
            .Map(desp => desp.items, src => src.items.Adapt<List<GetFeedbackResponse>>());      


        config.NewConfig<Post, GetPostByUserFeedbackResponse>()
            .Map(desp => desp.Id, src => src.Id)
            .Map(desp => desp.Post, src => src.Name)
            .Map(desp => desp.Image, src => src.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name);


        config.NewConfig<PostTypeOfRest, GetTypeOfRestResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Name, src => src.Name)
			.Map(desp => desp.Image, src => src.PostPostTypesOfRest!.FirstOrDefault()!.Post!.ImagesPost!.FirstOrDefault(img => img.Priority == 1)!.Name);


        config.NewConfig<(GetFilteredListRequest request,string name, int page, int sizeOfPage),
			GetPostByNameQuery>()
            .Map(dest => dest.Category, src => src.request.Category)
            .Map(dest => dest.Country, src => src.request.Country)
            .Map(dest => dest.City, src => src.request.City)
            .Map(dest => dest.Realtor, src => src.request.Realtor)
            .Map(dest => dest.Name, src => src.name)
            .Map(dest => dest.Page, src => src.page)
            .Map(dest => dest.SizeOfPage, src => src.sizeOfPage);


        config.NewConfig<PostCategory, GetCategoryResponse>();
		config.NewConfig<List<PostCategory>, List<GetCategoryResponse>>();


		config.NewConfig<PostCountry, GetCountryResponse>();
		config.NewConfig<List<PostCountry>, List<GetCountryResponse>>();


		config.NewConfig<GetCitiesListByCountryIdRequest, GetCitiesListByCountryIdQuery>()
            .Map(dest => dest.CountryId, src => src.CountryId);


		config.NewConfig<PostCity, GetCityResponse>();
		config.NewConfig<List<PostCity>, List<GetCityResponse>>();


		config.NewConfig<GetStreetsListByCityIdRequest, GetStreetsListByCityIdQuery>()
			.Map(dest => dest.CityId, src => src.CityId);


		config.NewConfig<PostStreet, GetStreetResponse>();
		config.NewConfig<List<PostStreet>, List<GetStreetResponse>>();


		config.NewConfig<PostTypeOfRent, GetTypeOfPostResponse>();
		config.NewConfig<List<PostTypeOfRent>, List<GetTypeOfPostResponse>>();


		config.NewConfig<Post, GetPostListForRealtorResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Category, src => src.Category!.Name)
			.Map(desp => desp.Adress,
			src => src.Street!.City!.Country!.Name + " " + src.Street.City.Name + " " + src.Street.Name)
			.Map(desp => desp.Name, src => src.Name)
			.Map(desp => desp.Price, src => src.Price)
			.Map(desp => desp.IsActive, src => src.IsActive)
			.Map(desp => desp.IsArhive, src => src.IsArhive)
			.Map(desp => desp.Discount, src => src.Discount);

		config.NewConfig<PagedList<Post>, PagedList<GetPostListForRealtorResponse>>();


		config.NewConfig<Post, GetPostForEditResponse>()
			.Map(desp => desp.CategoryName, src => src.Category!.Name)
			.Map(desp => desp.StreetName, src => src.Street!.Name)
			.Map(desp => desp.User, src => $"{src.User!.FirstName} {src.User.LastName}")
			.Map(desp => desp.CountryName, src => src.Street!.City!.Country!.Name)
			.Map(desp => desp.CountryId, src => src.Street!.City!.CountryId)
			.Map(desp => desp.CityName, src => src.Street!.City!.Name)
			.Map(desp => desp.CityId, src => src.Street!.City!.Id)
			.Map(desp => desp.NumberOfGuests, src => src.Rate)
			.Map(desp => desp.Discount, src => src.Discount)
			.Map(desp => desp.ZipCode, src => src.ZipCode)
			.Map(desp => desp.ImagePostList, src =>
			src.ImagesPost != null ? src.ImagesPost.Select(img => img.Name).ToArray() : Array.Empty<string>());
	

		config.NewConfig<(
			EditPostRequest editPostRequest, Guid UserId, List<byte[]> Images), EditPostCommand>()
		.Map(dest => dest.UserId, src => src.UserId)
		.Map(dest => dest.Images, src => src.Images)
		.Map(dest => dest, src => src.editPostRequest);


		config.NewConfig<Post, GetArchivedPostListForRealtorResponse>()
			.Map(desp => desp.Id, src => src.Id)
			.Map(desp => desp.Category, src => src.Category!.Name)
			.Map(desp => desp.Adress,
			src => src.Street!.City!.Country!.Name + " " + src.Street.City.Name + " " + src.Street.Name)
			.Map(desp => desp.Name, src => src.Name)
			.Map(desp => desp.Price, src => src.Price)
			.Map(desp => desp.DateOfPost, src => src.PostAt)
			.Map(desp => desp.DateOfEdit, src => src.EditAt)
			.Map(desp => desp.IsActive, src => src.IsActive);


		config.NewConfig<PagedList<Post>, PagedList<GetArchivedPostListForRealtorResponse>>();


		config.NewConfig<PostTypeOfRest, GetPostTypesOfRestResponse>();
		config.NewConfig<List<PostTypeOfRest>, List<GetPostTypesOfRestResponse>>();

		config.NewConfig<Service, GetServicesListResponse>();
		config.NewConfig<List<Service>, List<GetServicesListResponse>>();
	}
}
