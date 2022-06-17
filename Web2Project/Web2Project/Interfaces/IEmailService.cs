using Web2Project.Models;

namespace Web2Project.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
