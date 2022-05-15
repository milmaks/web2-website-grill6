using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Models;

namespace Web2Project.Infrastructure.Configurations
{
    public class DeliveryConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            builder.HasKey(x => x.Email); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Email).HasMaxLength(50);//kazem da je maks duzina 50 karaktera

            builder.HasIndex(x => x.Email).IsUnique();
        }
    }
}
