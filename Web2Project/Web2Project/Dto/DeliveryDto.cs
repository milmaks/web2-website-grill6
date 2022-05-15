using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Models;

namespace Web2Project.Dto
{
    public class DeliveryDto
    {
        public string Email { get; set; }
        public Status Status { get; set; }
    }
}
