﻿namespace Web2Project.Models
{
    public class ProductInOrder
    {
        public long Id { get; set; }
        public long OrderId { get; set; }
        public Order Order { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
