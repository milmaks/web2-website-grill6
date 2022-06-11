using System;

namespace Web2Project.Models
{
    public enum UserType { Administrator = 0, Buyer, Delivery, Social }
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public UserType Type { get; set; }
        public string ImagePath { get; set; }
    }
}
