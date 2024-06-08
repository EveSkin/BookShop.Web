using BookShop.Web.DTO;
using BookShop.Web.Models;

namespace BookShop.Web.Contract
{
    public interface IBaseService
    {
        ResponseDTO responseModel { get; set; }
        Task<T> SendAsync<T>(ApiRequest apiRequest);
    }
}
