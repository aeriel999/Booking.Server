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

namespace Booking.Application.Location.Town
{
    public class TownCommandHandler(ITownRepository townRepository)
    : IRequestHandler<TownListCommand, List<TownEntity>>, 
      IRequestHandler<GetTownByIdCommand, TownEntity>,        
      IRequestHandler<AddTownCommand, Unit>,
      IRequestHandler<DeleteTownCommand, Unit>,
      IRequestHandler<EditCategoryCommand, Unit>
    {
        public async Task<List<TownEntity>> Handle(TownListCommand request, CancellationToken cancellationToken)
        {
            return await townRepository.GetAllAsync();
        }

        public async Task<TownEntity> Handle(GetTownByIdCommand request, CancellationToken cancellationToken)
        {
            return await townRepository.GetTownOfId(request.TownId);
        }

        public async Task<Unit> Handle(AddTownCommand request, CancellationToken cancellationToken)
        {
            await townRepository.AddNewTown(request.entity);
            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteTownCommand request, CancellationToken cancellationToken)
        {
            await townRepository.DeleteTown(request.id);
            return Unit.Value;
        }

        public async Task<Unit> Handle(EditCategoryCommand request, CancellationToken cancellationToken)
        {
            await townRepository.EditTown(request.entity);
            return Unit.Value;
        }
    }
    

}
