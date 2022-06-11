using System.ComponentModel.DataAnnotations;

namespace Web2Project.Dto
{
    public class ProductDto
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public string Ingredients { get; set; }
    }
}
