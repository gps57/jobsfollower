using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IJobRepository
    {
        Task<IEnumerable<JobDto>> GetJobsAsync();
        Task<JobDto> GetJobAsync(int jobId);
        Task<JobDto> GetUserJobAsync(string username, int jobId);
        Task<IEnumerable<JobDto>> GetUserJobsAsync(string username);
    }
}