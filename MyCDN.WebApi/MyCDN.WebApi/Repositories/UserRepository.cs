using MyCDN.WebApi.Entities;
using MyCDN.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetUserById(int userId)
        {
            return _context.Users.Find(userId);
        }

        public User CreateUser(User user)
        {
            
            _context.Users.Add(user);
            _context.SaveChanges();
            user.Email = "user@example.com";

            return user;
        }
        public UserQuotas GetUserQuotas(int userId)
        {
            
            return _context.UserQuotas.FirstOrDefault(uq => uq.UserId == userId);
        }
    }
}
