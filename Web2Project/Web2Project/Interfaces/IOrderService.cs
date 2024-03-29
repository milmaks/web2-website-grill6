﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IOrderService
    {
        NewOrderDto NewOrder(NewOrderDto newOrderDto);  
        Task<List<OrderDto>> GetAllOrders();
        OrderDto ConfirmOrder(OrderConfirmationDto dto);
        List<OrderDto> GetOrdersByEmail(string email);
        OrderDto GetActiveOrder(string email);
        List<OrderDto> GetAllUnconfirmedOrders();
    }
}
