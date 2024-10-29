using Microsoft.AspNetCore.Mvc;
using TrophyTracker.Models;
using TrophyTracker.Data;
using AutoMapper;
using TrophyTracker.Models.DTO;


namespace TrophyTracker.Controllers
{
    [ApiController]
    [Route("Api/v1/[controller]")]
    public class PlayerController(TrophyTrackerContext context, IMapper mapper) : TrophyTrackerController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<PlayerDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<PlayerDTORead>>(_context.Players));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<PlayerDTORead> GetById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            Player? player;
            try
            {
                player = _context.Players.Find(id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            if (player == null)
            {
                return NotFound(new { message = "Player does not exist" });
            }

            return Ok(_mapper.Map<PlayerDTORead>(player));
        }

        [HttpPost]
        public IActionResult Post(PlayerDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                var player = _mapper.Map<Player>(dto);
                _context.Players.Add(player);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<PlayerDTORead>(player));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Put(int id, PlayerDTOInsertUpdate dto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = ModelState });
            }
            try
            {
                Player? player;
                try
                {
                    player = _context.Players.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (player == null)
                {
                    return NotFound(new { message = "Player does not exist" });
                }

                player = _mapper.Map(dto, player);

                _context.Players.Update(player);
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
                Player? player;
                try
                {
                    player = _context.Players.Find(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { message = ex.Message });
                }
                if (player == null)
                {
                    return NotFound("Player does not exist");
                }
                _context.Players.Remove(player);
                _context.SaveChanges();
                return Ok(new { message = "Successfully deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPut]
        [Route("setImage/{id:int}")]
        public IActionResult setImage(int id, ImageDTO image)
        {
            if (id <= 0)
            {
                return BadRequest("Id must be greater than 0.");
            }
            if(image.Base64 == null || image.Base64?.Length == 0)
            {
                return BadRequest("Image is not set.");
            }
            var player = _context.Players.Find(id);
            if(player == null)
            {
                return BadRequest("Player with id " + id + " does not exist");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "images" + ds + "players");

                if(!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var path = Path.Combine(dir + ds + id + ".png");
                System.IO.File.WriteAllBytes(path, Convert.FromBase64String(image.Base64!));

                return Ok("Successfully saved image");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
