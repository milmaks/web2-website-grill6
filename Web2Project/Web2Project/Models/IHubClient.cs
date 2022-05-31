using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web2Project.Models
{
    public interface IHubClient
    {
        Task BroadcastMessage();
    }
}
