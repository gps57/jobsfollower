using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class JobsController : BaseApiController
  {
    private readonly IMapper _mapper;
    private readonly IJobRepository _jobRepository;
    public JobsController(IJobRepository jobRepository)
    {
      _jobRepository = jobRepository;
    //   _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetJobs()
    {
        var jobs = await _jobRepository.GetJobsAsync();
        return Ok(jobs);
    }

    [HttpGet("{jobId}")]
    public async Task<ActionResult<JobDto>> GetJob(int jobId)
    {
      return await _jobRepository.GetJobAsync(jobId);
    }

  }
}