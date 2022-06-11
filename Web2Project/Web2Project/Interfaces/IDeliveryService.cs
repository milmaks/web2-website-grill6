using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IDeliveryService
    {
        DeliveryDto GetDelivery(string email);
    }
}
