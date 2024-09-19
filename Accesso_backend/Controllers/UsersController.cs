using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Accesso_backend.Models;
using System.Security.Cryptography;
using System.Text;
using Accesso_backend.Dtos;
using Accesso_backend.Data;
using Azure.Core;

namespace Accesso_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AccessContext _context;

        public UsersController(AccessContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userRegisterDto)
        {
            if (await UserExists(userRegisterDto.Username))
                return BadRequest("Username is already taken");
            CreatePasswordHash(userRegisterDto.Password, out string passwordHash, out string passwordSalt);

            var user = new User
            {
                Username = userRegisterDto.Username,
                Email = userRegisterDto.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            // il faut creer un user ! pour acceder a son id ! puis on va creer le cart vide et l'associer a cet user
            var cart = new Cart
            {
                UserId = user.Id
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Username });
        }

        // Spécifie que cette méthode répond aux requêtes POST à api/Users/login.
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return Unauthorized("password failed.");

            // Vérifiez ici les valeurs renvoyées pour s'assurer qu'elles ne sont pas nulles ou vides
            return Ok(user);
        }

        private bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            using (var hmac = new HMACSHA512(Convert.FromBase64String(storedSalt)))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(Convert.FromBase64String(storedHash));
            }
        }

        private void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = Convert.ToBase64String(hmac.Key);
                passwordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
            }
        }


        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }
    }
}
