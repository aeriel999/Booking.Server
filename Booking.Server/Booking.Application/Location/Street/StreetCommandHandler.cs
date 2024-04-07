using Booking.Application.Common.Interfaces.Locations;
using Booking.Domain.Models;
using MediatR;

namespace Booking.Application.Location.Street
{
    public class StreetCommandHandler : IRequestHandler<StreetListCommand, List<StreetEntity>>
    {
        private readonly IStreetRepository<StreetEntity> _streetRepository;

        public StreetCommandHandler(IStreetRepository<StreetEntity> streetRepository)
        {
            _streetRepository = streetRepository;
        }

        public async Task<List<StreetEntity>> Handle(StreetListCommand request, CancellationToken cancellationToken)
        {
            return await _streetRepository.GetAllAsync();
        }
    }
}
