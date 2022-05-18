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
    [Route("api/administrator")]
    [ApiController]
    public class AdministratorController : Controller
    {
        private readonly IAdministratorService _administratorService;

        public AdministratorController(IAdministratorService administratorService)
        {
            _administratorService = administratorService;
        }

        [HttpGet]
        [Authorize(Roles = "administrator")]
        public IActionResult GetAllDeliveryUsers()
        {
            return Ok(_administratorService.GetAllDeliveryUsers());
        }

        [HttpPost]
        [Authorize(Roles = "administrator")]
        public IActionResult ChangeDeliveryUser([FromBody] DeliveryDto dto)
        {
            if (_administratorService.ChangeDeliveryUserState(dto) == true)
                return Ok();
            else
                return StatusCode(409, "Something went wrong with status change. Try again");
        }

        [HttpPost("product")]
        [Authorize(Roles = "administrator")]
        public IActionResult AddNewProduct([FromBody] ProductDto dto)
        {
            return Ok(_administratorService.AddProduct(dto));
        }
    }
}
