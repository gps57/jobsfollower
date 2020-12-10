using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IJobRepository
    {
        void Update(Job job);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<JobDto>> GetJobsAsync();
        Task<Job> GetJobAsync(int jobId);
        Task<JobDto> GetJobDtoAsync(int jobId);
        Task<JobDto> GetUserJobAsync(string username, int jobId);
        Task<IEnumerable<JobDto>> GetUserJobsAsync(string username);
    }
}