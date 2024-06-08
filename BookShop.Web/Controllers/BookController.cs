using BookShop.Web.Contract;
using BookShop.Web.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookShop.Web.Controllers
{
    /// <summary>
    /// Author: Evelyn Namoncura
    /// Date: 07-06-2024
    /// Description: Prueba técnica
    /// </summary>
    public class BookController : Controller
    {
        public readonly IBookService _bookService;
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetBooks()
        {
            List<BookDTO> lst = new List<BookDTO>();
            var response = GetBookAllAsync();
            if (response.Result.IsSuccess)
            {
				lst = JsonConvert.DeserializeObject<List<BookDTO>>(Convert.ToString(response.Result.Result));
            }
            dynamic respuesta = new { data = lst };
            return Json(respuesta);
        }
        private async Task<ResponseDTO> GetBookAllAsync()
        {
            var response = await _bookService.GetBookAll<ResponseDTO>();
            return response;
        }
        private async Task<ResponseDTO> InsertBookAsync(BookDTO model)
        {
            var response = await _bookService.InsertBook<ResponseDTO>(model);
            return response;
        }
        [HttpPost]
        public async Task<IActionResult> SaveBook([FromBody] BookDTO model)
        {
            ResponseDTO response = new ResponseDTO();
            if (model.Id > 0)
            {
                response = await _bookService.UpdateBook<ResponseDTO>(model);
            }
            else
            {
                response = await _bookService.InsertBook<ResponseDTO>(model);
            }

            var status = response.IsSuccess ? 1 : 0;
            return new JsonResult(new { status = status });
        }
        [HttpPost]
        public async Task<IActionResult> DeleteBook([FromBody] BookDTO model)
        {
            var status = false;

            if (model.Id > 0)
            {
                var response = await _bookService.DeleteBook<ResponseDTO>(model);
                status = response.IsSuccess;
            }
            return new JsonResult(new { status = status });
        }
    }
}
