using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IDeliveryService
    {
        DeliveryDto GetDelivery(string email);
    }
}
