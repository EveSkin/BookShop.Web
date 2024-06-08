using BookShop.Web.DTO;

namespace BookShop.Web.Contract
{
    public interface IBookService: IBaseService
    {
        Task<T> InsertBook<T>(BookDTO bookDTO);
        Task<T> UpdateBook<T>(BookDTO bookDTO);
        Task<T> DeleteBook<T>(BookDTO bookDTO);
        Task<T> GetBookById<T>(int id);
        Task<T> GetBookAll<T>();
    }
}
