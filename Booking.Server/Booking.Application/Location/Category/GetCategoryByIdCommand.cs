using Booking.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Location.Category
{    
    public record GetCategoryByIdCommand(Guid categoryId) : IRequest<CategoryEntity>;
}
