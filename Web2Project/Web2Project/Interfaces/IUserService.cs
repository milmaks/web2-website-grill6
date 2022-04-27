using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IUserService
    {
        UserDto CreateUser(UserDto newUser);
        TokenDto Login(UserLogInDto dto);
    }
}
