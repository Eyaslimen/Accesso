namespace Accesso_backend.Dtos
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double price { get; set; }
        public string imageUrl { get; set; }
    }
}