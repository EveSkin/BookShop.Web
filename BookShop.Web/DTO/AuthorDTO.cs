namespace BookShop.Web.DTO
{
    public class AuthorDTO
    {
        public int Id { get; set; }
        public string Identifier { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime Birthdate { get; set; }
        public string CityOrigin { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
