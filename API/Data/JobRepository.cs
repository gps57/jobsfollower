using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class JobRepository : IJobRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public JobRepository(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<JobDto> GetJobDtoAsync(int jobId)
    {
        var job = await _context.Jobs.FindAsync(jobId);

        var returnValue = new JobDto {
            Id = job.Id,
            Url = job.Url,
            Title = job.Title,
            Description = job.Description,
            Company = job.Company,
            Created = job.Created,
            // TODO: Notes is now a collection so this needs to be fixed so the
            // collection of Notes for a job can be sent to the client side.
            // Notes = job.Notes,
            IsActive = job.IsActive 
            };

        return returnValue;
    }

    public async Task<Job> GetJobAsync(int jobId)
    {
      return await _context.Jobs.FindAsync(jobId);
    }

    public async Task<bool> SaveAllAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }    

    public async Task<PagedList<JobDto>> GetJobsAsync(JobParams jobParams)
    {
        // get all the jobs first
        var query = _context.Jobs.AsQueryable();

        // now filter it to the specific company being requested, if there is one.
        if (!string.IsNullOrEmpty(jobParams.Company))
        {
          query = query.Where(c => c.Company.ToLower().IndexOf(jobParams.Company.ToLower()) != -1);
        }

        // now filter it to job titles containing the user filter if there is one.
        if (!string.IsNullOrEmpty(jobParams.Title))
        {
          query = query.Where(t => t.Title.ToLower().IndexOf(jobParams.Title.ToLower()) != -1);
        }

        query = jobParams.OrderBy switch
        {
          "company" => query.OrderBy(u => u.Company),
          "title" => query.OrderBy(u => u.Title),
          _ => query.OrderBy(u => u.Created)
        };

        return await PagedList<JobDto>.CreateAsync
        (
          query.ProjectTo<JobDto>(_mapper.ConfigurationProvider).AsNoTracking(),
          jobParams.PageNumber,
          jobParams.PageSize
        );
    }

    public async Task<List<JobDto>> GetAllJobsAsync()
    {
      return await _context.Jobs.ProjectTo<JobDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public Task<JobDto> GetUserJobAsync(string username, int jobId)
    {
      throw new System.NotImplementedException();
    }

    public Task<PagedList<JobDto>> GetUserJobsAsync(string username)
    {
      throw new System.NotImplementedException();
    }

    public void Update(Job job)
    {
      _context.Entry(job).State = EntityState.Modified;
    }

    public async Task<JobsStatsDto> GetJobsStatsByUsernameAsync(string username)
    {

        var jobs = await _context.Jobs.Where(r => r.AppUser.UserName == username).ToListAsync();
        var activeJobs = jobs.Where(r => r.IsActive == true).ToList();
        var appliedJobs = jobs.Where(r => r.DateApplied != null).ToList();
        var respondedJobs = jobs.Where(r => r.Responded == true).ToList();

        var returnValue = new JobsStatsDto {
            TotalJobs = jobs.Count,
            TotalActive = activeJobs.Count,
            TotalApplied = appliedJobs.Count,
            TotalResponses = respondedJobs.Count
        };

        return returnValue;
    }
  }
}