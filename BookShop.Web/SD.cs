namespace BookShop.Web
{
    public static class SD
    {
        public static string BookShopAPIBase { get; set; }        
        public enum ApiType
        {
            GET,
            POST,
            PUT,
            DELETE
        }
    }
}
