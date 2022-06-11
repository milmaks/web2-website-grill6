using System;
using System.ComponentModel.DataAnnotations;
using Web2Project.Models;

namespace Web2Project.Dto
{
    public class UserDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required, RegularExpression("^(.+)@(.+)$")]
        public string Email { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public UserType Type { get; set; }

        public string ImagePath { get; set; }
    }
}
