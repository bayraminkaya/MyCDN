// UserQuotas.cs
using System.ComponentModel.DataAnnotations;

namespace MyCDN.WebApi.Entities
{
    public class UserQuotas
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TotalSpace { get; set; }
        public int UsedSpace { get; set; }
    }
}
