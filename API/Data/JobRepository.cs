using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
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

    public async Task<JobDto> GetJobAsync(int jobId)
    {
        var job = await _context.Jobs.FindAsync(jobId);

        var returnValue = new JobDto {
            Id = job.Id,
            Url = job.Url,
            Title = job.Title,
            Description = job.Description,
            Company = job.Company,
            Created = job.Created,
            Notes = job.Notes,
            IsActive = job.IsActive 
            };

        return returnValue;
    }

    public async Task<IEnumerable<JobDto>> GetJobsAsync()
    {
        return await _context.Jobs
        .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public Task<JobDto> GetUserJobAsync(string username, int jobId)
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<JobDto>> GetUserJobsAsync(string username)
    {
      throw new System.NotImplementedException();
    }
  }
}