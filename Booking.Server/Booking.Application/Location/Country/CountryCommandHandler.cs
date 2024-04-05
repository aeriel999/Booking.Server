using Booking.Application.Common.Interfaces;
using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Locations;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Models;
using ErrorOr;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Location.Country
{
    public class CountryCommandHandler(ICountryRepository countryRepository)
    : IRequestHandler<CountryListCommand, List<CountryEntity>>
    {
        public async Task<List<CountryEntity>> Handle(CountryListCommand request, CancellationToken cancellationToken)
        {
            return await countryRepository.GetAllAsync();
        }
    }
}
