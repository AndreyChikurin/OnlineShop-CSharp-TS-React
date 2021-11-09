﻿namespace WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using Application.DTO;
    using Application.DTO.Request;
    using Application.Interfaces;
    using Application.ViewModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Swashbuckle.AspNetCore.Annotations;

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private IProductService productService;
        private ICategoryService categoryService;
        private ILogger<ProductsController> logger;

        public ProductsController(ILogger<ProductsController> logger, IProductService productService, ICategoryService categoryService)
        {
            this.logger = logger;
            this.productService = productService;
            this.categoryService = categoryService;
        }

        [HttpGet]
        public IEnumerable<ProductDto> GetProducts()
        {
            return productService.GetProducts();
        }

        [HttpGet("Pagination")]
        public IEnumerable<ProductDto> GetProductsPagination(int quantityPerPage, int pageNumber)
        {
            return productService.GetProductsPagination(quantityPerPage, pageNumber);
        }

        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(ProductDto))]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [HttpGet("{id}")]
        public ActionResult<ProductDto> GetProduct(Guid id)
        {
            var product = productService.GetProduct(id);

            if (product is null)
            {
                return NotFound();
            }

            return product;
        }

        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(ProductDto))]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [HttpPost]
        public ActionResult<ProductDto> AddProduct(AddProductDto productDto)
        {
            CategoryDto exsistingGategory = categoryService.GetCategory(productDto.CategoryTypeId);

            if (exsistingGategory is null)
            {
                return NotFound("Category not found");
            }

            ProductDto product = productDto.AsDto();
            product.CategoryType = exsistingGategory;
            productService.AddProduct(product);
            return Ok(product);
        }

        [SwaggerResponse((int)HttpStatusCode.OK, "", typeof(ProductDto))]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [HttpPut]
        public ActionResult EditProduct(EditProductDto productDto)
        {
            var existingProduct = productService.GetProduct(productDto.Id);

            if (existingProduct is null)
            {
                return NotFound("Product not found");
            }

            var exsistingGategory = categoryService.GetCategory(productDto.CategoryTypeId);

            if (exsistingGategory is null)
            {
                return NotFound("Category not found");
            }

            var product = productDto.AsDto();
            product.CategoryType = exsistingGategory;

            productService.EditProduct(product);
            return Ok();
        }

        [SwaggerResponse((int)HttpStatusCode.NoContent)]
        [SwaggerResponse((int)HttpStatusCode.NotFound)]
        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(Guid id)
        {
            var existingProduct = productService.GetProduct(id);

            if (existingProduct is null)
            {
                return NotFound();
            }

            productService.DeleteProduct(id);
            return NoContent();
        }
    }
}
