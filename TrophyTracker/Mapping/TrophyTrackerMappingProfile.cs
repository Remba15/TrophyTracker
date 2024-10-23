using AutoMapper;
using TrophyTracker.Models;
using TrophyTracker.Models.DTO;

namespace TrophyTracker.Mapping
{
    public class TrophyTrackerMappingProfile : Profile
    {

        public TrophyTrackerMappingProfile()
        {
            CreateMap<Player, PlayerDTORead>();
            CreateMap<PlayerDTOInsertUpdate, Player>();

            CreateMap<Game, GameDTORead>();
            CreateMap<GameDTOInsertUpdate, Game>();

            CreateMap<Trophy, TrophyDTORead>()
                .ForCtorParam(
                    "GameTitle",
                    opt => opt.MapFrom(src => src.Game.Title)
                );
            CreateMap<Trophy, TrophyDTOInsertUpdate>().ForMember(
                    dest => dest.GameID,
                    opt => opt.MapFrom(src => src.Game.ID)
                );
            CreateMap<TrophyDTOInsertUpdate, Game>();
        }

    }
}
