using Application.Interfaces;
using Application.Services;
using Domain.Models;
using Domain.RepositoryInterfaces;
using Infrastructure.EF;
using Infrastructure.Interfaces;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

IConfiguration configuration = builder.Configuration;
IWebHostEnvironment environment = builder.Environment;
IServiceCollection services = builder.Services;

services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp";
});

string dbconectionString = builder.Configuration.GetConnectionString("DefaultConnection");
services.AddEntityFrameworkSqlServer().AddDbContext<DatabaseContext>(options => options.UseSqlServer(dbconectionString));

services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
services.AddIdentity<User, IdentityRole<Guid>>().AddEntityFrameworkStores<DatabaseContext>();
services.AddScoped<RoleManager<IdentityRole<Guid>>>();
services.AddScoped<UserManager<User>>();
services.AddScoped<SignInManager<User>>();
services.AddScoped<IAccountService, AccountService>();
services.AddScoped<IRolesIntializer, RolesInitializer>();

services.Configure<IdentityOptions>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
    options.Password.RequireNonAlphanumeric = false;
});

services.AddAuthentication(o =>
{
    o.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
    o.DefaultForbidScheme = GoogleDefaults.AuthenticationScheme;
    o.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
}).AddCookie()
    .AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
    {
        IConfigurationSection googleAuthNSection = configuration.GetSection("Authentication:Google");
        options.ClientId = googleAuthNSection["ClientId"];
        options.ClientSecret = googleAuthNSection["ClientSecret"];
    });

services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "ServicePickerCookies";
    options.LoginPath = "/User/Login/";
    options.AccessDeniedPath = "/User/AccessDenied/";
    options.LogoutPath = "/User/Logout/";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
});

services.AddSingleton<IDatabaseContextFactory, DatabaseContextFactory>();

services.AddScoped<IServiceRepository, ServiceRepository>(provider =>
    new ServiceRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
services.AddScoped<IFeatureRepository, FeatureRepository>(provider =>
    new FeatureRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
services.AddScoped<IUserRepository, UserRepository>(provider =>
    new UserRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
services.AddScoped<IReviewRepository, ReviewRepository>(provider =>
    new ReviewRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));
services.AddScoped<ICategoryRepository, CategoryRepository>(provider =>
    new CategoryRepository(dbconectionString, provider.GetService<IDatabaseContextFactory>()));


services.AddScoped<IServiceService, ServiceService>();
services.AddScoped<IFeatureService, FeatureService>();
services.AddScoped<IReviewService, ReviewService>();
services.AddScoped<ICategoryService, CategoryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseSpaStaticFiles();

app.UseRouting();

app.UseAuthorization();


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";
});

app.MapControllers();

app.Run();