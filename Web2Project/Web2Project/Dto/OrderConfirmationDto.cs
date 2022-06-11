using System.ComponentModel.DataAnnotations;

namespace Web2Project.Dto
{
    public class OrderConfirmationDto
    {
        [Required]
        public long Id { get; set; }
        [Required, RegularExpression("^(.+)@(.+)$")]
        public string Email { get; set; }
    }
}
