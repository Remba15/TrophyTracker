using AutoMapper;
using System.Runtime.CompilerServices;
using TrophyTracker.Models;
using TrophyTracker.Models.DTO;

namespace TrophyTracker.Mapping
{
    public class TrophyTrackerMappingProfile : Profile
    {

        public TrophyTrackerMappingProfile()
        {
            #region Player Mapping
            CreateMap<Player, PlayerDTORead>()
                .ConstructUsing(entity =>
                    new PlayerDTORead(
                        entity.ID,
                        entity.Username,
                        entity.RegistrationDate,
                        entity.Region,
                        filePath(entity)
                        )
                );
            CreateMap<PlayerDTOInsertUpdate, Player>();
            #endregion

            #region Game Mapping
            CreateMap<Game, GameDTORead>();
            CreateMap<GameDTOInsertUpdate, Game>();
            #endregion

            #region Trophy Mapping
            CreateMap<Trophy, TrophyDTORead>()
                .ForCtorParam(
                    "GameTitle",
                    opt => opt.MapFrom(src => src.Game.Title)
                );
            CreateMap<Trophy, TrophyDTOInsertUpdate>().ForMember(
                    dest => dest.GameID,
                    opt => opt.MapFrom(src => src.Game.ID)
                );
            CreateMap<TrophyDTOInsertUpdate, Trophy>();
            #endregion

            #region Achievement Mapping
            CreateMap<Achievement, AchievementDTORead>().ConstructUsing(e =>
                new AchievementDTORead(e.ID, e.Player.Username, e.Trophy.Title, e.DateAchieved)
            );
            CreateMap<AchievementDTOInsert, Achievement>();
            #endregion



        }

        private string? filePath(Player entity)
        {

            try
            {
                var ds = Path.DirectorySeparatorChar;
                string image = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "images" + ds + "players" + ds + entity.ID + ".png");
                return File.Exists(image) ? "/images/players/" + entity.ID + ".png" : null;
            }
            catch
            {
                return null;
            }

        }
    }
}
