namespace BookShop.Web.DTO
{
    public class BookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Year { get; set; }
        public int NumberPages { get; set; }
        public int IdAuthor { get; set; }
    }
}
