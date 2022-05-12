using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Dto;
using Web2Project.Interfaces;

namespace Web2Project.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Post([FromBody] UserLogInDto dto)
        {
            return Ok(_userService.Login(dto));
        }

        [HttpPost]
        public IActionResult Create([FromBody] UserDto dto)
        {
            if(_userService.CreateUser(dto) != null)
                return Ok();
            return StatusCode(409, $"User '{dto.Email}' already exists.");
        }
    }
}
