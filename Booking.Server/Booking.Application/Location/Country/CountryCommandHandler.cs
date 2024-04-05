using Booking.Application.Common.Interfaces;
using Booking.Application.Common.Interfaces.Authentication;
using Booking.Application.Common.Interfaces.Users;
using Booking.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Location.Country
{
    public class CountryCommandHandler(
    IRepository<CountryEntity> countryRepository)
    : IRequestHandler<CountryListCommand, List<CountryEntity>>
    {
        public Task<List<CountryEntity>> Handle(CountryListCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
