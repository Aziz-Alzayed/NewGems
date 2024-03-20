using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NG.DataCore.Models.JwtModels;
using NG.DataCore.Models.Users;
using NG.DataCore.Models;
using NG.Infrastructure.Authentication;
using NG.Infrastructure.CommonServices.SeedServices;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Text;
using NG.Infrastructure.CommonServices.EndPointsRegisterServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NG.Infrastructure.MediatoR.Common.Decorators;

namespace NG.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            // Automatically register services
            services.AddAutoRegisteredServices(Assembly.GetExecutingAssembly());

            //MediatoR
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestsDecorator<,>));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));

            //Adding Autpmapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }
        public static IServiceCollection AddInfrastructureConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            //Adding Identities
            services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
                .AddEntityFrameworkStores<DataModelContext>()
                .AddDefaultTokenProviders();
            CustomIdentityOptions.ConfigureIdentityOptions(services);

            //Adding DbContext
            var connectionString = configuration.GetConnectionString("DataModelContext");
            services.AddDbContext<DataModelContext>(options =>
            {
                options.UseSqlServer(
                    connectionString,
                    builder =>
                    {
                        builder.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                        builder.CommandTimeout(180);
                    });
                options.EnableSensitiveDataLogging();
                options.EnableDetailedErrors();

            });

            //Adding JWT authentication and Validation.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            var jwtTokenConfig = configuration.GetSection("jwtTokenConfig").Get<JwtTokenConfigModel>();
            services.AddSingleton(jwtTokenConfig);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddCookie()
                .AddJwtBearer("Bearer", options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtTokenConfig.Issuer,
                        ValidAudience = jwtTokenConfig.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtTokenConfig.SecretKey)),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

            services.ConfigureApplicationCookie(config =>
            {
                config.SlidingExpiration = true;
                config.ExpireTimeSpan = TimeSpan.FromDays(1);// caching the Auth. for 1 day.
            });

            //Adding Autherization to all controller "MinimumAdminPortalRole".
            services.AddControllers();

            return services;
        }

        public static void InitializeDatabase(this IApplicationBuilder app)
        {
            try
            {
                using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
                {
                    var seedService = serviceScope.ServiceProvider.GetRequiredService<IIdentitySeedService>();

                    // Ensure roles are seeded
                    seedService.SeedRoles().Wait();

                    // Seed users
                    seedService.SeedSuperUser().Wait();
                    seedService.SeedAdminUser().Wait();
                    seedService.SeedUser().Wait();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
