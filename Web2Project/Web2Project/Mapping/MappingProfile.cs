using AutoMapper;
using Web2Project.Dto;
using Web2Project.Models;

namespace Web2Project.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap(); //Mapira User na UserDto i obrnuto
            CreateMap<Delivery, DeliveryDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<ProductInOrder, ProductInOrderDto>().ReverseMap();
        }
    }
}
