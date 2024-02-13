using MyCDN.WebApi.Application.DTOs;
using MyCDN.WebApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyCDN.WebApi.Entities;
using MyCDN.WebApi.Application.DTOs;

namespace MyCDN.WebApi.Application.Mappers
{
    public static class UserMapper
    {
        public static UserDTO ToDTO(this User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                Password = user.Password
                
            };
        }
    }
}
