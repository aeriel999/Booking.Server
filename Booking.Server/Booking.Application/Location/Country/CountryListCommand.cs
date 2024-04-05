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
    public record CountryListCommand() : IRequest<List<CountryEntity>>;
}
