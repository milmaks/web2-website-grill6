using System.Threading.Tasks;

namespace Web2Project.Models
{
    public interface IHubClient
    {
        Task BroadcastMessage();
    }
}
