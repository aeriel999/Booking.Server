using Booking.Application.Common.Interfaces.Locations;
using Booking.Application.Location.Town;
using Booking.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking.Application.Location.Category
{
    public class CategoryCommandHandler(ICategoryRepository categoryRepository)
        : IRequestHandler<CategoryListCommand, List<CategoryEntity>>,
        IRequestHandler<GetCategoryByIdCommand, CategoryEntity>,
        IRequestHandler<AddCategoryCommand, Unit>,
        IRequestHandler<DeleteCategoryCommand, Unit>,
        IRequestHandler<EditCategoryCommand, Unit>
    {
        public async Task<List<CategoryEntity>> Handle(CategoryListCommand request, CancellationToken cancellationToken)
        {
            return await categoryRepository.GetAllAsync();
        }

        public async Task<CategoryEntity> Handle(GetCategoryByIdCommand request, CancellationToken cancellationToken)
        {
            return await categoryRepository.GetCategoryOfId(request.categoryId);
        }

        public async Task<Unit> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
        {
            await categoryRepository.AddNewCategory(request.entity);
            return Unit.Value;
        }

        public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
             await categoryRepository.DeleteCategory(request.id);
            return Unit.Value;
        }

        public async Task<Unit> Handle(EditCategoryCommand request, CancellationToken cancellationToken)
        {
           await categoryRepository.EditCategory(request.entity);
            return Unit.Value;
        }
    }
}





    

