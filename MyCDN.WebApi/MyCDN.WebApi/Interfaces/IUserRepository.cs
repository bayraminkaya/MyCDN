using MyCDN.WebApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCDN.WebApi.Interfaces
{
    public interface IUserRepository
    {
        User GetUserById(int userId);
        User CreateUser(User user); 
        UserQuotas GetUserQuotas(int userId); 
    }
}
