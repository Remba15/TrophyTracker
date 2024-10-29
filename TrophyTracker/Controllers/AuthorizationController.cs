using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TrophyTracker.Data;
using TrophyTracker.Models.DTO;

namespace TrophyTracker.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthorizationController(TrophyTrackerContext context) : ControllerBase
    {
        private readonly TrophyTrackerContext _context = context;

        [HttpPost("token")]
        public IActionResult GenerateToken(UserDTO user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userDb = _context.Users
                .Where(u => u.Email!.Equals(user.Email))
                .FirstOrDefault();

            if (userDb == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Not authorized, unable to find user");
            }

            if(!BCrypt.Net.BCrypt.Verify(user._Password, userDb._Password))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Not authorized, wrong password");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("MyKeyWhichIsVerySecretAndLongEnoughSoThatItCanBeUsed");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.Add(TimeSpan.FromHours(8)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Ok(jwt);
        }
    }
}
