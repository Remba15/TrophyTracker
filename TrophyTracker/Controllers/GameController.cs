using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrophyTracker.Data;
using TrophyTracker.Models;
using TrophyTracker.Models.DTO;

namespace TrophyTracker.Controllers
{
    [ApiController]
    [Route("Api/v1/[controller]")]
    public class GameController(TrophyTrackerContext context, IMapper mapper) : TrophyTrackerController(context, mapper)
    {

        [HttpGet]
        public ActionResult<GameDTORead> Get()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<GameDTORead>>(_context.Games));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<GameDTORead> GetById(int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Game? game;
            try
            {
                game = _context.Games.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (game == null)
            {
                return NotFound(new { message = "Game does not exist in database" });
            }

            return Ok(_mapper.Map<GameDTORead>(game));

        }

        [HttpPost]
        public IActionResult Post(GameDTOInsertUpdate dto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var game = _mapper.Map<Game>(dto);
                _context.Games.Add(game);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<GameDTORead>(game));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, GameDTOInsertUpdate dto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Game? game;
                try
                {
                    game = _context.Games.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (game == null)
                {
                    return NotFound(new { message = "Game does not exist in database" });
                }

                game = _mapper.Map(dto, game);

                _context.Games.Update(game);
                _context.SaveChanges();

                return Ok(new { message = "Change successfull" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Game? game;
                try
                {
                    game = _context.Games.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (game == null)
                {
                    return NotFound("Game does not exist in database");
                }

                _context.Games.Remove(game);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet]
        [Route("search/{condition}")]
        public ActionResult<List<GameDTORead>> SearchGame(string condition)
        {
            if(condition == null || condition.Length < 3)
            {
                return BadRequest(ModelState);
            }
            condition = condition.ToLower();
            try
            {
                IEnumerable<Game> query = _context.Games;
                var sequence = condition.Split(" ");
                foreach (var s in condition.Split(" "))
                {
                    query = query.Where(p => p.Title.ToLower().Contains(s) || p.Developer.ToLower().Contains(s));
                }
                var games = query.ToList();
                return Ok(_mapper.Map<List<GameDTORead>>(games));
            }
            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }


        
        [HttpGet]
        [Route("searchPaging/{page}")]
        public IActionResult searchGamePaging(int page, string condition = "")
        {
            var perPage = 4;
            condition = condition.ToLower();
            try
            {
                // Start with the full query on the games table
                IEnumerable<Game> query = _context.Games;

                // Apply search conditions
                var sequence = condition.Split(" ");
                foreach (var s in sequence)
                {
                    query = query.Where(p => p.Title.ToLower().Contains(s) || p.Developer.ToLower().Contains(s));
                }

                // Apply sorting, then skip and take for pagination
                query = query
                    .OrderBy(p => p.Title)
                    .Skip((page - 1) * perPage)
                    .Take(perPage);

                var games = query.ToList();

                return Ok(_mapper.Map<List<GameDTORead>>(games));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
