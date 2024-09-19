using System.ComponentModel.DataAnnotations.Schema;

namespace Accesso_backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double price { get; set; }
        public int CategoryId { get; set; }
        public string imageUrl { get; set; }
        public Category? Category { get; set; } // on ajoutons ? ça peut declarer qu'on peux avoir ses valeurs null !!! 
        public List<CartItem>? CartItems { get; set; }
        public List<OrderItem>? OrderItems { get; set; }
    }
}
