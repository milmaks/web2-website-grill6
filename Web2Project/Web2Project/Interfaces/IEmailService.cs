using Web2Project.Models;

namespace Web2Project.Interfaces
{
    public interface IEmailService
    {
        public void SendEmail(Message message);
    }
}
