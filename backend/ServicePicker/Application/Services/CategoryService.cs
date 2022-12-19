namespace Application.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Application.DTO.Request;
    using Application.DTO.Response;
    using Application.Helpers;
    using Application.Interfaces;
    using Domain.Models;
    using Domain.RepositoryInterfaces;

    public class CategoryService : ICategoryService
    {
        private ICategoryRepository _categoryRepository;
        private IServiceRepository _serviceRepository;

        public CategoryService(ICategoryRepository categoryRepository, IServiceRepository serviceRepository)
        {
            _categoryRepository = categoryRepository;
            _serviceRepository = serviceRepository;
        }

        public List<CategoryDto> GetCategories(string search)
        {
            if (search == "\"\"") 
            {
                search = null;
            }

            return _categoryRepository.GetItems().Where(c => string.IsNullOrEmpty(search) || c.Name.Contains(search)).Select(x => new CategoryDto(x)).ToList();
        }

        public CategoryDto GetCategory(Guid id)
        {
            var category = _categoryRepository.GetItem(id);
            if (category != null) {
                category.Services = null;
                return new CategoryDto(category);
            }

            return null;
        }


        public CategoryServices GetCategory(Guid id, int page, int itemsOnPage)
        {
            var category = _categoryRepository.GetItem(id);
            if (category != null)
            {
                var services = _serviceRepository.GetItems().Where(s => s.Published && s.CategoryId == category.Id).OrderByDescending(s => s.UserScore);
                var paginatedServices = Paginator<Service>.ElementsOfPage(services, page, itemsOnPage);
                return new CategoryServices(category, paginatedServices);
            }
            else
            {
                return null;
            }
        }

        public CategoryDto CreateCategory(CategoryCreateRequestDto category)
        {
            return new CategoryDto(_categoryRepository.CreateItem(category.ToModel()));
        }

        public CategoryDto UpdateCategory(CategoryUpdateRequestDto category)
        {
            return new CategoryDto(_categoryRepository.UpdateItem(category.ToModel()));
        }

        public int DeleteCategory(Guid id)
        {
            var category = _categoryRepository.GetItem(id);
            if (category != null && (category.Services == null || category.Services.Count == 0))
            {
                return _categoryRepository.DeleteItem(category);
            }
            else
            {
                return 0;
            }
        }
    }
}
