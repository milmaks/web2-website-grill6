using System.ComponentModel.DataAnnotations;

namespace Web2Project.Dto
{
    public class UserLogInDto
    {
        [Required, RegularExpression("^(.+)@(.+)$")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
