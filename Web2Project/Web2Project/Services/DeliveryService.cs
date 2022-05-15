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
    public class DeliveryService : IDeliveryService
    {
        private readonly IMapper _mapper;
        private readonly SiteDbContext _dbContext;

        public DeliveryService(IMapper mapper, SiteDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public DeliveryDto GetDelivery(string email)
        {
            Delivery delivery = _dbContext.Deliveries.Find(email);

            if (delivery == null)
                return null;
            else
                return _mapper.Map<DeliveryDto>(delivery);
        }
    }
}
