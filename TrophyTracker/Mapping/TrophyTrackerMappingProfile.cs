using AutoMapper;
using TrophyTracker.Models;
using TrophyTracker.Models.DTO;

namespace TrophyTracker.Mapping
{
    public class TrophyTrackerMappingProfile : Profile
    {

        public TrophyTrackerMappingProfile()
        {
            #region Player Mapping
            CreateMap<Player, PlayerDTORead>();
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
            CreateMap<Achievement, AchievementDTORead>()
                .ForCtorParam(
                    "PlayerUsername",
                    opt => opt.MapFrom(src => src.Player.Username)
                );
            CreateMap<Achievement, AchievementDTORead>()
                .ForCtorParam(
                    "TrophyTitle",
                    opt => opt.MapFrom(src => src.Trophy.Title)
                );
            CreateMap<Achievement, AchievementDTOInsert>().ForMember(
                    dest => dest.Player_ID,
                    opt => opt.MapFrom(src => src.Player.ID)
                );
            CreateMap<Achievement, AchievementDTOInsert>().ForMember(
                    dest => dest.Trophy_ID,
                    opt => opt.MapFrom(src => src.Trophy.ID)
                );
            CreateMap<AchievementDTOInsert, Achievement>();
            #endregion



        }

    }
}
