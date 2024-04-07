﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Posts
{
    public record DeletePostCommand(Guid id) : IRequest<Unit>;
}
