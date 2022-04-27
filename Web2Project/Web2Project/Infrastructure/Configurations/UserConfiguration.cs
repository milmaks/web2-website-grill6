using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web2Project.Models;

namespace Web2Project.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Email); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Email).HasMaxLength(50);//kazem da je maks duzina 50 karaktera

            builder.HasIndex(x => x.Email).IsUnique();   //Kazem da je username
                                                            //jedinstven podatak (ne smeju biti 2 ista)
            builder.Property(x => x.Name).HasMaxLength(30);
            builder.Property(x => x.Lastname).HasMaxLength(30);
            builder.Property(x => x.Address).HasMaxLength(30);
            builder.Property(x => x.Username).HasMaxLength(30);
        }
    }
}
