using AutoMapper;
using TrophyTracker.Data;

namespace TrophyTracker.Controllers
{
    public class AchievementController(TrophyTrackerContext context, IMapper mapper) : TrophyController(context, mapper)
    {



    }
}
