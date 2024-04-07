﻿using Booking.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Location.Town
{
    public record EditTownCommand(TownEntity entity) : IRequest<Unit>;
}
