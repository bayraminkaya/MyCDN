using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using MyCDN.WebApi.Application.Services;
using MyCDN.WebApi.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
namespace MyCDN.Core.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAllUsersAsync().Result;
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userService.GetUserByIdAsync(id).Result;

            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}
