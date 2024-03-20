using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using NG.DataCore.Models.Users;

namespace NG.DataCore.Models
{
    public class DataModelContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public DbContextOptions<DataModelContext> Options { get; }
        public DataModelContext()
        {
        }

        public DataModelContext(DbContextOptions<DataModelContext> options)
            : base(options)
        {
            Options = options;
            this.Database.SetCommandTimeout(180);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connString = ConfigurationManager.ConnectionStrings["DataModelContext"]?.ConnectionString ?? "test";
                optionsBuilder.UseSqlServer(connString);
                optionsBuilder.EnableSensitiveDataLogging();
            }
        }
    }
}
