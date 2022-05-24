using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IOrderService
    {
        NewOrderDto NewOrder(NewOrderDto newOrderDto);  
        List<OrderDto> GetAllOrders();
        OrderDto ConfirmOrder(OrderConfirmationDto dto);
        List<OrderDto> GetOrdersByEmail(string email);
        OrderDto GetActiveOrder(string email);

    }
}
