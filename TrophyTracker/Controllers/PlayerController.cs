using Microsoft.AspNetCore.Mvc;
using TrophyTracker.Models;
using TrophyTracker.Data;


namespace TrophyTracker.Controllers
{
    [ApiController]
    [Route("Api/v1/[controller]")]
    public class PlayerController : ControllerBase
    {

        private readonly TrophyTrackerContext _context;

        public PlayerController(TrophyTrackerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Players);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.Players.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Player player)
        {
            _context.Players.Add(player);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, player);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, Player player)
        {

            var playerDb = _context.Players.Find(id);

            playerDb.Username = player.Username;
            playerDb.RegistrationDate = player.RegistrationDate;
            playerDb.Region = player.Region;

            _context.Players.Update(playerDb);
            _context.SaveChanges();

            return Ok(new { message = "Update successful" });

        }


        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {

            var playerDb = _context.Players.Find(id);

            _context.Players.Remove(playerDb);
            _context.SaveChanges();

            return Ok(new { message = "Successfully removed" });

        }
    }
}
