using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Dto;
using Web2Project.Infrastructure;
using Web2Project.Interfaces;
using Web2Project.Models;

namespace Web2Project.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly SiteDbContext _dbContext;

        public OrderService(IMapper mapper, SiteDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public List<OrderDto> GetAllOrders()
        {
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders.ToList());
        }

        public NewOrderDto NewOrder(NewOrderDto newOrderDto)
        {
            OrderDto orderDto = new OrderDto();
            orderDto.Id = 0;
            orderDto.BuyerEmail = newOrderDto.BuyerEmail;
            orderDto.ProductsInOrder = newOrderDto.ProductsInOrder;
            orderDto.Address = newOrderDto.Address;
            orderDto.Comment = newOrderDto.Comment;
            orderDto.Price = 200;
            foreach (var prod in orderDto.ProductsInOrder)
            {
                //orderDto.Price += prod.Product.Price * prod.Quantity;
            }
            orderDto.OrderTime = DateTime.Now;

            Order order = _mapper.Map<Order>(orderDto);
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            newOrderDto.Id = order.Id;
            newOrderDto.Price = order.Price;
            newOrderDto.OrderTime = order.OrderTime;
            return _mapper.Map<NewOrderDto>(newOrderDto);
        }
    }
}
