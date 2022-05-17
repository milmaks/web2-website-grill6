﻿using AutoMapper;
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
        private readonly IEmailService _emailService;
        private readonly string acceptedMessage = "Vaš zahtev je prihvaćen. Možete nastaviti sa korišćenjem usluga dostavljača.";
        private readonly string declinedMessage = "Žao nam je, Vaš zahtev za nalog dostavljača je odbijen.";

        public AdministratorService(IMapper mapper, SiteDbContext dbContext, IEmailService emailService)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _emailService = emailService;
        }

        public bool ChangeDeliveryUserState(DeliveryDto dto)
        {
            Delivery delivery = _dbContext.Deliveries.Find(dto.Email);
            
            if (delivery == null)
                return false;

            delivery.Status = dto.Status;

            if (delivery.Status == Status.Accepted)
                _emailService.SendEmail(new Message(new string[] { delivery.Email }, "GRILL6 Verifikacija", acceptedMessage, null));
            else
                _emailService.SendEmail(new Message(new string[] { delivery.Email }, "GRILL6 Verifikacija", declinedMessage, null));


            _dbContext.SaveChanges();
            return true;
        }

        public List<DeliveryDto> GetAllDeliveryUsers()
        {
            return _mapper.Map<List<DeliveryDto>>(_dbContext.Deliveries.ToList());
        }
    }
}
