using Booking.Api.Contracts.CrudOperation.Category;
using Booking.Api.Contracts.CrudOperation.Country;
using Booking.Api.Contracts.CrudOperation.Post;
using Booking.Api.Contracts.CrudOperation.Street;
using Booking.Api.Contracts.CrudOperation.Town;
using Booking.Domain.Models;
using Mapster;

namespace Booking.Api.Common.Mapping
{
    public class EntityMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<AddTownDto, TownEntity>();
            config.NewConfig<EditTownDto, TownEntity>();
            config.NewConfig<CountryDto, CountryEntity>();
            config.NewConfig<CategoryDto, CategoryEntity>();
            config.NewConfig<StreetDto, StreetEntity>();
            config.NewConfig<ImagesPostDto, ImagesPostEntity>();
            config.NewConfig<PostViewDto, PostEntity>();
            config.NewConfig<AddPostDto, PostEntity>();
        }
    }
}
