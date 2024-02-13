using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyCDN.WebApi.Entities;
namespace MyCDN.WebApi
{
    public class ApplicationDbContext : DbContext
    {
       
        public DbSet<User> Users { get; set; }
        public DbSet<MyFile> Files { get; set; }
        public DbSet<UserQuotas> UserQuotas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // SQLite kullanacak şekilde yapılandırma
            optionsBuilder.UseSqlite("Data Source=mycdn.db");
        }
    }
}
