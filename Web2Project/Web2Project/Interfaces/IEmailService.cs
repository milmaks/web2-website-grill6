using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Models;

namespace Web2Project.Interfaces
{
    public interface IEmailService
    {
        public void SendEmail(Message message);
    }
}
