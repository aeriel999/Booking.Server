using Booking.Domain.Models;
using ErrorOr;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Location.Town
{
    public record AddTownCommand(TownEntity entity) : IRequest<Unit>;    
}
