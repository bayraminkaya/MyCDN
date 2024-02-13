using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyCDN.WebApi.Entities;
using MyCDN.WebApi.Interfaces;
using MyCDN.WebApi.Repositories;

namespace MyCDN.WebApi.Services
{
    // UserService.cs
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IEmailService _emailService; 

        public UserService(IUserRepository userRepository, IEmailService emailService)
        {
            _userRepository = userRepository;
            _emailService = emailService;
        }

        public User GetUserById(int userId)
        {
            return _userRepository.GetUserById(userId);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            
            try
            {
                var createdUser = _userRepository.CreateUser(user);

                
                string to = createdUser.Email;
                string subject = "Hesap Oluşturuldu";
                string body = "Hesabınız başarıyla oluşturuldu.";

                
                await _emailService.SendEmailAsync(to, subject, body);

                return createdUser;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }

}
