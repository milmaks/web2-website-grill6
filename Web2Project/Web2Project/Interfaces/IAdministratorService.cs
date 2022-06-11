using System.Collections.Generic;
using Web2Project.Dto;

namespace Web2Project.Interfaces
{
    public interface IAdministratorService
    {
        List<DeliveryDto> GetAllDeliveryUsers();
        bool ChangeDeliveryUserState(DeliveryDto dto);
        ProductDto AddProduct(ProductDto newProduct);
    }
}
