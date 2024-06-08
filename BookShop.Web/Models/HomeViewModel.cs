using BookShop.Web.DTO;

namespace BookShop.Web.Models
{
    public class HomeViewModel
    {
        public AuthorDTO author { get; set; }
        public BookDTO book { get; set; }
        public List<AuthorDTO> authorList { get; set; }
        public List<BookDTO> bookList { get; set; }
    }
}
