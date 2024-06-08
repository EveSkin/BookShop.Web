using BookShop.Web.Contract;
using BookShop.Web.DTO;
using BookShop.Web.Models;

namespace BookShop.Web.Services
{
    public class AuthorService: BaseService, IAuthorService
    {
        private readonly IHttpClientFactory _clientFactory;
        private const string route = "/api/author";
        public AuthorService(IHttpClientFactory clientFactory) : base(clientFactory)
        {
            _clientFactory = clientFactory;
        }
        public async Task<T> InsertAuthor<T>(AuthorDTO authorDTO)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.POST,
                Data = authorDTO,
                Url = SD.BookShopAPIBase + route + "/InsertAuthor"
            });
        }
        public async Task<T> UpdateAuthor<T>(AuthorDTO authorDTO)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.PUT,
                Data = authorDTO,
                Url = SD.BookShopAPIBase + route + "/UpdateAuthor"
            });
        }       
        public async Task<T> DeleteAuthor<T>(AuthorDTO authorDTO)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.DELETE,
                Data = authorDTO,
                Url = SD.BookShopAPIBase + route + "/DeleteAuthor"
            });
        }       
        public async Task<T> GetAuthorById<T>(int id)
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.POST,
                Data = id,
                Url = SD.BookShopAPIBase + route + "/GetAuthorById"
            });
        }
        public async Task<T> GetAuthorAll<T>()
        {
            return await this.SendAsync<T>(new ApiRequest()
            {
                ApiType = SD.ApiType.GET,               
                Url = SD.BookShopAPIBase + route + "/GetAuthorAll"
            });
        }
    }
}
