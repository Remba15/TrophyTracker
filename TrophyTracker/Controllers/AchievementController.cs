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
    public class AchievementController(TrophyTrackerContext context, IMapper mapper) : TrophyTrackerController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<AchievementDTORead>> Get()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<AchievementDTORead>>(_context.Achievements.Include(p => p.Player).Include(p => p.Trophy)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<AchievementDTOInsert> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Achievement? achievement;
            try
            {
                achievement = _context.Achievements.Include(a => a.Player).FirstOrDefault(a => a.ID == id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if(achievement == null)
            {
                return NotFound(new { message = "Achievement does not exist in database" });
            }
            return Ok(_mapper.Map<AchievementDTOInsert>(achievement));
        }


        [HttpPost]
        public IActionResult Post(AchievementDTOInsert dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Player? player;
            Trophy? trophy;
            try
            {
                player = _context.Players.Find(dto.Player_ID);
                trophy = _context.Trophies.Find(dto.Trophy_ID);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (player != null)
            {
                return NotFound(new { message = "Player not found in database!" });
            }
            if (trophy != null)
            {
                return NotFound(new { message = "Trophy not found in database!" });
            }

            try
            {
                var achievement = _mapper.Map<Achievement>(dto);
                achievement.Player = player;
                achievement.Trophy = trophy;

                _context.Achievements.Add(achievement);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, _mapper.Map<AchievementDTORead>(achievement));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, AchievementDTOInsert dto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Achievement? achievement;
                try
                {
                    achievement = _context.Achievements.Include(a => a.Player).FirstOrDefault(a => a.ID == id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (achievement == null)
                {
                    return NotFound(new { message = "Achievement does not exist in database" });
                }

                Player? player;
                try
                {
                    player = _context.Players.Find(dto.Player_ID);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if(player == null)
                {
                    return NotFound(new { message = "Player in achievements does not exist" });
                }

                achievement = _mapper.Map(dto, achievement);
                achievement.Player = player;
                _context.Achievements.Update(achievement);
                _context.SaveChanges();

                return Ok(new { message = "Achievement successfully updated" });

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
                Achievement? e;
                try
                {
                    e = _context.Achievements.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Achievement does not exist in database!");
                }
                _context.Achievements.Remove(e);
                _context.SaveChanges();
                return Ok(new { message = "Achievement successfully removed!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
