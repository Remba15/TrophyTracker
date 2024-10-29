using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TrophyTracker.Data;

namespace TrophyTracker.Controllers
{
   [Authorize]
    public abstract class TrophyTrackerController (TrophyTrackerContext context, IMapper mapper) : ControllerBase
    {

        protected readonly TrophyTrackerContext _context = context;

        protected readonly IMapper _mapper = mapper;

    }
}
