using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IJobRepository
    {
        void Update(Job job);
        Task<bool> SaveAllAsync();
        Task<PagedList<JobDto>> GetJobsAsync(JobParams jobParams);
        Task<Job> GetJobAsync(int jobId);
        Task<JobDto> GetJobDtoAsync(int jobId);
        Task<JobDto> GetUserJobAsync(string username, int jobId);
        Task<PagedList<JobDto>> GetUserJobsAsync(string username);
    }
}