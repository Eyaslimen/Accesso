using Accesso_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace Accesso_backend.Data
{
    public class AccessContext :DbContext
    {
        public AccessContext(DbContextOptions<AccessContext> options) : base(options) { 
        
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ONE TO  ONE //
            //One to one relation entre cart et user
            modelBuilder.Entity<User>()
                .HasOne(c => c.Cart)
                .WithOne(u => u.User)
                .HasForeignKey<Cart>(u => u.UserId)
                .IsRequired();

            // ONE TO MANY //
            //One to many relation entre category et products
            modelBuilder.Entity<Category>()
                .HasMany(p => p.products)
                .WithOne(c => c.Category)
                .HasForeignKey(c => c.CategoryId)
                .IsRequired();
            //One to many relation entre cart et cartItems
            modelBuilder.Entity<Cart>()
                .HasMany(c => c.CartItems)
                .WithOne(c => c.Cart)
                .HasForeignKey(c => c.CartId)
                .IsRequired(false);
            //One to many relation entre order et orderItems
            modelBuilder.Entity<Order>()
                .HasMany(c => c.OrderItems)
                .WithOne(c => c.Order)
                .HasForeignKey(c => c.OrderId)
                .IsRequired(false);
            //One to many relation entre User et Orders
            modelBuilder.Entity<User>()
                .HasMany(c => c.Orders)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .IsRequired(false);

            //MANY TO ONE //
            // Many-to-One: CartItem - Product
            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Product)
                .WithMany(p => p.CartItems)
                .HasForeignKey(ci => ci.ProductId);
            // Many-to-One: OrderItem - Product
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(oi => oi.ProductId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

    }
}
