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

            CreateMap<Trophy, TrophyDTORead>();
            CreateMap<TrophyDTOInsertUpdate, Game>();
        }

    }
}
