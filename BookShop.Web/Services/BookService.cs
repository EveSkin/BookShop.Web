using BookShop.Web.Contract;
using BookShop.Web.DTO;
using BookShop.Web.Models;

namespace BookShop.Web.Services
{
    public class BookService: BaseService, IBookService
    {
        private readonly IHttpClientFactory _clientFactory;
        private const string route = "/api/book";

        public BookService(IHttpClientFactory clientFactory) : base(clientFactory)
        {
            _clientFactory = clientFactory;
        }
        public async Task<T> InsertBook<T>(BookDTO bookDTO)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.POST,
                Data = bookDTO,
                Url = SD.BookShopAPIBase + route + "/InsertBook"
            });
        }
        public async Task<T> UpdateBook<T>(BookDTO bookDTO)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.PUT,
                Data = bookDTO,
                Url = SD.BookShopAPIBase + route + "/UpdateBook"
            });
        }
        public async Task<T> DeleteBook<T>(BookDTO bookDTO)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.DELETE,
                Data = bookDTO,
                Url = SD.BookShopAPIBase + route + "/DeleteBook"
            });
        }
        public async Task<T> GetBookById<T>(int id)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.POST,
                Data = id,
                Url = SD.BookShopAPIBase + route + "/GetBookById"
            });
        }
        public async Task<T> GetBookAll<T>()
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.GET,
                Url = SD.BookShopAPIBase + route + "/GetBookAll"
            });
        }
    }
}
