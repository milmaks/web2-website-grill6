using System.ComponentModel.DataAnnotations;
using Web2Project.Models;

namespace Web2Project.Dto
{
    public class DeliveryDto
    {
        [Required, RegularExpression("^(.+)@(.+)$")]
        public string Email { get; set; }
        [Required]
        public Status Status { get; set; }
    }
}
