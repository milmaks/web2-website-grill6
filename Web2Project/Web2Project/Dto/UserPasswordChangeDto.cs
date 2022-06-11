using System.ComponentModel.DataAnnotations;

namespace Web2Project.Dto
{
    public class UserPasswordChangeDto
    {
        [Required, RegularExpression("^(.+)@(.+)$")]
        public string Email { get; set; }
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
