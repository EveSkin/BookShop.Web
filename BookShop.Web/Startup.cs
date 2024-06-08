using BookShop.Web.Contract;
using BookShop.Web.Services;

namespace BookShop.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSession();
            services.AddHttpClient<IAuthorService, AuthorService>();
            services.AddHttpClient<IBookService, BookService>();
            SD.BookShopAPIBase = Configuration["ServiceUrls:BookShopAPI"];            
            services.AddScoped<IAuthorService, AuthorService>();
            services.AddScoped<IBookService, BookService>();          
            services.AddControllersWithViews();         
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseStatusCodePagesWithRedirects("/Home/Error?code={0}");
            app.UseSession();         
            app.UseStaticFiles();
            app.UseRouting();          
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            var builder = new ConfigurationBuilder()
           .SetBasePath(env.ContentRootPath)
           .AddJsonFile("errors.json", optional: false, reloadOnChange: true)
           .AddEnvironmentVariables();
        }
    }
}
