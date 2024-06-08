using System;
using BookShop.Web.Contract;
using BookShop.Web.DTO;
using BookShop.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookShop.Web.Controllers
{
    /// <summary>
    /// Author: Evelyn Namoncura
    /// Date: 07-06-2024
    /// Description: Prueba técnica
    /// </summary>
    public class AuthorController : Controller
    {
        public readonly IAuthorService _authorService;
        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        public IActionResult Index()
        {                      
            return View();
        }
        [HttpPost]
        public JsonResult GetAuthors()
        {            
            List<AuthorDTO> lstSalesorderPay = new List<AuthorDTO>();        
            var response = GetAuthorAllAsync();
            if (response.Result.IsSuccess)
            {
                lstSalesorderPay = JsonConvert.DeserializeObject<List<AuthorDTO>>(Convert.ToString(response.Result.Result));
            }
            dynamic respuesta = new { data = lstSalesorderPay };
            return Json(respuesta);
        }
        private async Task<ResponseDTO> GetAuthorAllAsync()
        {            
            var response = await _authorService.GetAuthorAll<ResponseDTO>();
            return response;
        }       
        private async Task<ResponseDTO> InsertAuthorAsync(AuthorDTO model)
        {            
            var response = await _authorService.InsertAuthor<ResponseDTO>(model);
            return response;
        }
        [HttpPost]
        public async Task<IActionResult> SaveAuthor([FromBody] AuthorDTO model)
        {
            ResponseDTO response = new ResponseDTO();
            if (model.Id>0)
            {
                response = await _authorService.UpdateAuthor<ResponseDTO>(model);
            }
            else
            {
                response = await _authorService.InsertAuthor<ResponseDTO>(model);
            }
            
            var status = response.IsSuccess?1:0;
            return new JsonResult(new { status = status });
        }
        [HttpPost]
        public async Task<IActionResult> DeleteAuthor([FromBody] AuthorDTO model)
        {
            var status = false;

            if (model.Id > 0)
            {                
                var response = await _authorService.DeleteAuthor<ResponseDTO>(model);
                status = response.IsSuccess;
            }
            return new JsonResult(new { status = status });
        }
    }
}
