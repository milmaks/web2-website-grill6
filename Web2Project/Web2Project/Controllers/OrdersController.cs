using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        [Authorize(Roles = "administrator")]
        public IActionResult GetAllOrders()
        {
            return Ok(_orderService.GetAllOrders());
        }

        [HttpPost]
        [Authorize(Roles = "buyer")]
        public IActionResult NewOrder([FromBody] NewOrderDto dto)
        {
            NewOrderDto newOrder = _orderService.NewOrder(dto);

            if (newOrder != null)
                return Ok();
            else
                return StatusCode(409);
        }

        [HttpPost("confirm")]
        [Authorize(Roles = "delivery")]
        public IActionResult ConfirmOrder([FromBody] OrderConfirmationDto dto)
        {
            OrderDto order = _orderService.ConfirmOrder(dto);

            if (order != null)
                return Ok();
            else
                return StatusCode(409);
        }

        [HttpGet("user")]
        [Authorize(Roles = "delivery,buyer")]
        public IActionResult GetUsersOrders()
        {
            string userEmail = "";
            try
            {
                userEmail = User.Claims.Where(a => a.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value;
            }
            catch (Exception)
            {
                return StatusCode(409);
            }

            return Ok(_orderService.GetOrdersByEmail(userEmail));
        }

        [HttpGet("user/active")]
        [Authorize(Roles = "delivery,buyer")]
        public IActionResult GetUsersActiveOrder()
        {
            string userEmail = "";
            try
            {
                userEmail = User.Claims.Where(a => a.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value;
            }
            catch (Exception)
            {
                return StatusCode(409);
            }

            OrderDto order = _orderService.GetActiveOrder(userEmail);

            if (order == null)
                return StatusCode(204);
            else
                return Ok(order);
        }
    }
}
