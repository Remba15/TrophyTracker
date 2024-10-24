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
    public class TrophyController(TrophyTrackerContext context, IMapper mapper) : TrophyTrackerController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<TrophyDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<TrophyDTORead>>(_context.Trophies.Include(t => t.Game)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<TrophyDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Trophy? trophy;
            try
            {
                trophy = _context.Trophies.Include(t => t.Game).FirstOrDefault(t => t.ID == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (trophy == null)
            {
                return NotFound(new { message = "Trophy does not exist in database" });
            }

            return Ok(_mapper.Map<TrophyDTORead>(trophy));
        }

        [HttpPost]
        public IActionResult Post(TrophyDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }

            Game? game;
            try
            {
                game = _context.Games.Find(dto.GameID);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (game == null)
            {
                return NotFound(new { message = "Game for this trophy does not exist in database" });
            }

            try
            {
                var trophy = _mapper.Map<Trophy>(dto);
                trophy.Game = game;
                _context.Trophies.Add(trophy);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<TrophyDTOInsertUpdate>(trophy));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, TrophyDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Trophy? trophy;
                try
                {
                    trophy = _context.Trophies.Include(t => t.Game).FirstOrDefault(x => x.ID == id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (trophy == null)
                {
                    return NotFound(new { message = "Trophy does not exist in database" });
                }

                Game? game;
                try
                {
                    game = _context.Games.Find(dto.GameID);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (game == null)
                {
                    return NotFound(new { message = "Game for this trophy does not exist in database" });
                }

                trophy = _mapper.Map(dto, trophy);
                trophy.Game = game;
                _context.Trophies.Update(trophy);
                _context.SaveChanges();

                return Ok(new { message = "Successfully updated" });

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
                Trophy? trophy;
                try
                {
                    trophy = _context.Trophies.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (trophy == null)
                {
                    return NotFound("Trophy does not exist in database");
                }
                _context.Trophies.Remove(trophy);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



    }
}
