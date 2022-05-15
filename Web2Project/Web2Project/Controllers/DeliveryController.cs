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
    [Route("api/delivery")]
    [ApiController]
    public class DeliveryController : Controller
    {
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(IDeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }

        [HttpGet]
        [Authorize(Roles = "delivery")]
        public IActionResult GetDelivery()
        {
            DeliveryDto delivery = _deliveryService.GetDelivery(User.Claims.Where(a => a.Type == ClaimTypes.NameIdentifier).FirstOrDefault().Value);
            if (delivery != null)
                return Ok(delivery);
            else
                return StatusCode(409, "Error while trying to get informations.");
        }
    }
}
