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
    public class AdministratorService : IAdministratorService
    {
        private readonly IMapper _mapper;
        private readonly SiteDbContext _dbContext;

        public AdministratorService(IMapper mapper, SiteDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public bool ChangeDeliveryUserState(DeliveryDto dto)
        {
            Delivery delivery = _dbContext.Deliveries.Find(dto.Email);
            
            if (delivery == null)
                return false;

            delivery.Status = dto.Status;
            _dbContext.SaveChanges();
            return true;
        }

        public List<DeliveryDto> GetAllDeliveryUsers()
        {
            return _mapper.Map<List<DeliveryDto>>(_dbContext.Deliveries.ToList());
        }
    }
}
