using System.Security.AccessControl;
using System.Security.Claims;
using static BookShop.Web.SD;

namespace BookShop.Web.Models
{
    public class ApiRequest
    {
        public ApiType ApiType { get; set; } = ApiType.GET;
        public string Url { get; set; }
        public object Data { get; set; }
    }
}
