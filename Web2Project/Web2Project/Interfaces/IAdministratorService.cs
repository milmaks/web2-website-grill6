using System.Collections.Generic;
using System.Threading.Tasks;
using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IAdministratorService
    {
        Task<List<DeliveryDto>> GetAllDeliveryUsers();
        bool ChangeDeliveryUserState(DeliveryDto dto);
        ProductDto AddProduct(ProductDto newProduct);
    }
}
