using System.Collections.Generic;
using System.Threading.Tasks;
using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IUserService
    {
        UserDto CreateUser(UserDto newUser);
        UserDto GetUser(string email);
        TokenDto Login(UserLogInDto dto);
        TokenDto SocialLogin(SocialLoginUserDto dto);
        TokenDto ChangeUserInfo(UserDto updatedUser);
        UserDto ChnageUserPassword(UserPasswordChangeDto dto);
        bool AddUsersPicture(string email, string path);
        string GetUsersPicture(string email);
        Task<List<ProductDto>> GetAllProducts();
    }
}
