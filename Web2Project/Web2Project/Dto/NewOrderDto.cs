using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2Project.Dto
{
    public class NewOrderDto
    {
        public long Id { get; set; }
        public string BuyerEmail { get; set; }
        public List<ProductInOrderDto> ProductsInOrder { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public double Price { get; set; }
        public DateTime OrderTime { get; set; }
    }
}
