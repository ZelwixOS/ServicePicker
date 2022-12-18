using Application.DTO.Request;
using Application.DTO.Response;

namespace Application.Interfaces
{
    public interface ICategoryService
    {
        CategoryDto CreateCategory(CategoryCreateRequestDto category);
        int DeleteCategory(Guid id);
        List<CategoryDto> GetCategories();
        CategoryServices GetCategory(Guid id, int page, int itemsOnPage);
        CategoryDto UpdateCategory(CategoryUpdateRequestDto category);
    }
}