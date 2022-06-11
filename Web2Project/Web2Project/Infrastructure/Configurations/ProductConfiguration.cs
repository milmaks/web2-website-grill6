using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web2Project.Models;

namespace Web2Project.Infrastructure.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd(); //primarni kljuc
                                                               //automatski generisati prilikom dodavanja

            builder.Property(x => x.Name).HasMaxLength(30);
            builder.Property(x => x.Ingredients).HasMaxLength(100);
        }
    }
}
