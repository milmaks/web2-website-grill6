using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Dto;
using Web2Project.Interfaces;

namespace Web2Project.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        //[Authorize]
        public IActionResult GetAllOrders()
        {
            return Ok(_orderService.GetAllOrders());
        }

        [HttpPost]
        //[Authorize]
        public IActionResult NewOrder([FromBody] NewOrderDto dto)
        {
            NewOrderDto newOrder = _orderService.NewOrder(dto);

            if (newOrder != null)
                return Ok();
            else
                return StatusCode(409);
        }
    }
}
