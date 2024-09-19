using Accesso_backend.Data;
using Accesso_backend.Dtos;
using Accesso_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Accesso_backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly AccessContext _context;
        public CartsController(AccessContext context)
        {
            _context = context;
        }
        // GET ALL CARTS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }
        // Get CartItems by UserId
        [HttpGet("cart/{userId}")]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems(int userId)
        {
            var cartItems = await _context.CartItems
                .Where(c => c.Cart.UserId == userId)
                .Select(c => new CartItemDto
                {
                    Id = c.Id,
                    ProductName = c.Product.Name,
                    price = c.Product.price,
                    Quantity = c.Quantity,
                    imageUrl = c.Product.imageUrl
                })
                .ToListAsync();

            return Ok(cartItems);
        }


        // add an cartItem to the cart
        [HttpPost("cart/{userId}/add")]
        public async Task<IActionResult> AddToCart(int userId, [FromBody] AddToCartDto dto)
        {
            var cart = await _context.Carts
                                      .Include(c => c.CartItems)
                                      .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Panier non trouvé pour l'utilisateur.");
            }

            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null)
            {
                return NotFound("Produit non trouvé.");
            }

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == dto.ProductId);
            if (cartItem != null)
            {
                cartItem.Quantity += dto.Quantity;
            }
            else
            {
                cartItem = new CartItem
                {
                    ProductId = dto.ProductId,
                    CartId = cart.Id,
                    Quantity = dto.Quantity
                };
                cart.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();

            // Renvoi uniquement les informations essentielles
            return Ok(new { cartItem.Id, cartItem.ProductId, cartItem.Quantity });
        }

        //Delete a cartItem 
        // DELETE a cart item from the cart
        [HttpDelete("cart/{userId}/remove/{cartItemId}")]
        public async Task<IActionResult> DeleteCartItem(int userId, int cartItemId)
        {
            var cart = await _context.Carts
                                     .Include(c => c.CartItems)
                                     .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Panier non trouvé pour l'utilisateur.");
            }

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
            if (cartItem == null)
            {
                return NotFound("Article non trouvé dans le panier.");
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Article supprimé du panier avec succès." });
        }




    }
}
