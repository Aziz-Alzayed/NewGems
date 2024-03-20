using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NG.DataCore.Models
{
    public class Base
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

    }
    public static class BaseRelationships
    {
        public static void ApplyRelationships<T>(EntityTypeBuilder<T> entity) where T : Base
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
        }
    }
}
