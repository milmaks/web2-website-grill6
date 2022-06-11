using System;
using System.Collections.Generic;

namespace Web2Project.Models
{
    public class Order
    {
        public long Id { get; set; }
        public string BuyerEmail { get; set; }
        public string DeliveryEmail { get; set; }
        public List<ProductInOrder> ProductsInOrder { get; set; }
        public string Address { get; set; }
        public string Comment { get; set; }
        public float Price { get; set; }
        public DateTime OrderTime { get; set; }
        public DateTime DeliveryTime { get; set; }
    }
}
