using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
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

    public JobsController(IJobRepository jobRepository, IMapper mapper)
    {
      _jobRepository = jobRepository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetJobs([FromQuery]JobParams jobParams)
    {
        var jobs = await _jobRepository.GetJobsAsync(jobParams);

        Response.AddPaginationHeader(jobs.CurrentPage, jobs.PageSize, jobs.TotalCount, jobs.TotalPages);

        return Ok(jobs);
    }

    [HttpGet]
    [Route("all")]
    public async Task<ActionResult<IEnumerable<JobDto>>> GetAllJobs()
    {
      return await _jobRepository.GetAllJobsAsync();
    }

    [HttpGet("{jobId}")]
    public async Task<ActionResult<JobDto>> GetJob(int jobId)
    {
      return await _jobRepository.GetJobDtoAsync(jobId);
    }

    // for example: api/jobs/username
    [HttpGet("getstats/{username}", Name = "GetStats")]
    public async Task<ActionResult<JobsStatsDto>> GetStats(string username)
    {
      return await _jobRepository.GetJobsStatsByUsernameAsync(username);
    }

    // How do I structure this?
    // PUT: api/update/id
    [HttpPut("update/{jobId}")]
    public async Task<ActionResult> UpdateJob(JobUpdateDto jobUpdateDto, int jobId)
    {
      var job = await _jobRepository.GetJobAsync(jobId);

      _mapper.Map(jobUpdateDto, job);

      _jobRepository.Update(job);

      if (await _jobRepository.SaveAllAsync()) return NoContent();

      return BadRequest("Failed to update job profile.");
    }

  }
}