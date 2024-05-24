using Booking.Application.Common.Behaviors;
using Booking.Domain.Posts;
using ErrorOr;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Posts.GetListOfPost
{
    public record GetListOfPostQuery(int page, int sizeOfPage) : IRequest<ErrorOr<PagedList<Post>>>;
}
