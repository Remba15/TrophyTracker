using Microsoft.AspNetCore.Mvc;
using TrophyTracker.Data;

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

    }
}
