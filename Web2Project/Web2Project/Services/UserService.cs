using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Web2Project.Dto;
using Web2Project.Infrastructure;
using Web2Project.Interfaces;
using Web2Project.Models;

namespace Web2Project.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly SiteDbContext _dbContext;

        public UserService(IMapper mapper, IConfiguration config, SiteDbContext dbContext)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _dbContext = dbContext;
        }

        public bool AddUsersPicture(string email, string path)
        {
            User user = _dbContext.Users.Find(email);

            if (user == null)
                return false;

            user.ImagePath = path;
            _dbContext.SaveChanges();
            return true;
        }

        public TokenDto ChangeUserInfo(UserDto updatedUser)
        {
            User user = _dbContext.Users.Find(updatedUser.Email);

            if(user == null)
                return null;

            if (BCrypt.Net.BCrypt.Verify(updatedUser.Password, user.Password))
            {
                user.Name = updatedUser.Name;
                user.Lastname = updatedUser.Lastname;
                user.BirthDate = updatedUser.BirthDate;
                user.Address = updatedUser.Address;
                user.Username = updatedUser.Username;

                _dbContext.SaveChanges();
                return GetToken(user);
            }
            else
            {
                return null;
            }
        }

        public UserDto ChnageUserPassword(UserPasswordChangeDto dto)
        {
            User user = _dbContext.Users.Find(dto.Email);

            if (user == null)
                return null;

            if (BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
                _dbContext.SaveChanges();

                return _mapper.Map<UserDto>(user);
            }
            else
                return null;
        }

        public UserDto CreateUser(UserDto newUser)
        {
            try
            {
                User user = _mapper.Map<User>(newUser);
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _dbContext.Users.Add(user);

                if (user.Type == UserType.Delivery)
                    _dbContext.Deliveries.Add(new Delivery { Email = user.Email, Status = Status.InProgress });

                _dbContext.SaveChanges();

                return _mapper.Map<UserDto>(user);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<ProductDto> GetAllProducts()
        {
            return _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList());
        }

        public UserDto GetUser(string email)
        {
            User user = _dbContext.Users.Find(email);

            if (user == null)
                return null;
            else
                return _mapper.Map<UserDto>(user);
        }

        public string GetUsersPicture(string email)
        {
            User user = _dbContext.Users.Find(email);

            if (user == null)
                return string.Empty;
            else
                return user.ImagePath;
        }

        public TokenDto Login(UserLogInDto dto)
        {
            User user = _dbContext.Users.Find(dto.Email);

            if (user == null)
                return null;

            if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))//Uporedjujemo hes pasvorda iz baze i unetog pasvorda
            {
                return GetToken(user);
            }
            else
            {
                return null;
            }
        }

        private TokenDto GetToken(User user)
        {
            List<Claim> claims = new List<Claim>();
            //Mozemo dodati Claimove u token, oni ce biti vidljivi u tokenu i mozemo ih koristiti za autorizaciju
            if (user.Type == UserType.Administrator)
                claims.Add(new Claim(ClaimTypes.Role, "administrator")); //Add user type to claim
            if (user.Type == UserType.Delivery)
                claims.Add(new Claim(ClaimTypes.Role, "delivery")); //Add user type to claim
            if (user.Type == UserType.Buyer)
                claims.Add(new Claim(ClaimTypes.Role, "buyer")); //Add user type to claim
            claims.Add(new Claim(ClaimTypes.Name, user.Name + " " + user.Lastname));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Email));
            if(user.ImagePath != null)
                claims.Add(new Claim(ClaimTypes.UserData, "true"));
            else
                claims.Add(new Claim(ClaimTypes.UserData, "false"));

            //Kreiramo kredencijale za potpisivanje tokena. Token mora biti potpisan privatnim kljucem
            //kako bi se sprecile njegove neovlascene izmene
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:44304", //url servera koji je izdao token
                claims: claims, //claimovi
                expires: DateTime.Now.AddMinutes(20), //vazenje tokena u minutama
                signingCredentials: signinCredentials //kredencijali za potpis
            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return new TokenDto { Token = tokenString };
        }
    }
}
