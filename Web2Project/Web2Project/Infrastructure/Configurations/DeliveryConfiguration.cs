using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web2Project.Models;

namespace Web2Project.Infrastructure.Configurations
{
    public class DeliveryConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            builder.HasKey(x => x.Email); //primarni kljuc tabele

            builder.Property(x => x.Email).HasMaxLength(50);

            builder.HasIndex(x => x.Email).IsUnique();
        }
    }
}
