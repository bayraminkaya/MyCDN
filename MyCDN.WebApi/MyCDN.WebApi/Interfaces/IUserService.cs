using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using MyCDN.WebApi.Entities;

namespace MyCDN.WebApi.Interfaces
{
    public interface IUserService
    {
        User GetUserById(int userId);
    }
}
