using Microsoft.AspNetCore.Mvc;
using TrophyTracker.Data;
using TrophyTracker.Models;

namespace TrophyTracker.Controllers
{
    [ApiController]
    [Route("Api/v1/[controller]")]
    public class GameController : ControllerBase
    {

        private readonly TrophyTrackerContext _context;

        public GameController(TrophyTrackerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_context.Games);

        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_context.Games.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Game game)
        {
            _context.Games.Add(game);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, game);
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, Game game)
        {

            var gameDb = _context.Games.Find(id);

            gameDb.Title = game.Title;
            gameDb.GameDescription = game.GameDescription;
            gameDb.GamePlatform = game.GamePlatform;

            _context.Games.Update(gameDb);
            _context.SaveChanges();

            return Ok(new { message = "Successfully updated" });

        }

        //[HttpDelete]
        //[Route("{id:int}")]
        //[Produces("application/json")]
        //public IActionResult Delete(int id)
        //{
        //    var gameDb = _context.Games.Find(id);

        //    _context.Games.Remove(gameDb);
        //    _context.SaveChanges();

        //    return Ok(new { message = "Successfully removed" });
        //}

    }
}
