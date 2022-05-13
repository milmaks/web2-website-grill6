using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

        [HttpGet("user")]
        [Authorize]
        public IActionResult GetUserInfo()
        {
            var userID = User.Claims.Where(a => a.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value;
            UserDto user = _userService.GetUser(User.Claims.Where(a => a.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value);
            if(user != null)
                return Ok(user);
            else
                return StatusCode(409, $"User doesn\'t exist.");
        }


        [HttpPost("change")]
        [Authorize]
        public IActionResult ChangeUserInfo([FromBody] UserDto dto)
        {
            TokenDto token = _userService.ChangeUserInfo(dto);
            if (token != null)
                return Ok(token);
            return StatusCode(409, $"Wrong password, try again.");
        }
    }
}
