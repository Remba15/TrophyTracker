using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TrophyTracker.Data;

namespace TrophyTracker.Controllers
{
    public class TrophyTrackerController : ControllerBase
    {

        protected readonly TrophyTrackerContext _context;

        protected readonly IMapper _mapper;

        public TrophyTrackerController(TrophyTrackerContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
