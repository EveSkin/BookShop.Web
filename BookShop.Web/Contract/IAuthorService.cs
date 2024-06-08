using BookShop.Web.DTO;

namespace BookShop.Web.Contract
{
    public interface IAuthorService: IBaseService
    {
        Task<T> InsertAuthor<T>(AuthorDTO authorDTO);
        Task<T> UpdateAuthor<T>(AuthorDTO authorDTO);
        Task<T> DeleteAuthor<T>(AuthorDTO authorDTO);
        Task<T> GetAuthorById<T>(int id);
        Task<T> GetAuthorAll<T>();
    }
}
