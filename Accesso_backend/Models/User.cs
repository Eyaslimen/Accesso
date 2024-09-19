namespace Accesso_backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Email { get; set; }
        public Cart? Cart { get; set; }
        public List<Order>? Orders { get; set; }
    }
}
