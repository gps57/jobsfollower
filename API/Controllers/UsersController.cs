using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;
    public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
    {
      _photoService = photoService;
      _mapper = mapper;
      _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SeekerDto>>> GetUsers()
    {
      var users = await _userRepository.GetSeekersAsync();
      return Ok(users);
    }

    // for example: api/users/3
    [HttpGet("{username}")]
    public async Task<ActionResult<SeekerDto>> GetUser(string username)
    {
      return await _userRepository.GetSeekerAsync(username);
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
      var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
      var result = await _photoService.AddPhotoAsync(file);

      if (result.Error != null)
      {
        return BadRequest(result.Error.Message);
      }

      var photo = new Photo
      {
        Url = result.SecureUrl.AbsoluteUri,
        PublicId = result.PublicId
      };

      // for this application, the user is probably only going to enter one photo - their user profile photo
      // so there shouldn't be a concept of a Main photo.
      if (user.Photos.Count == 0)
      {
        photo.IsMain = true;
      }

      user.Photos.Add(photo);

      if (await _userRepository.SaveAllAsync())
      {
        return _mapper.Map<PhotoDto>(photo);
      }
      
      return BadRequest("Problem adding photo");

    }

    [HttpPost("add-job")]
    public async Task<ActionResult<JobDto>> AddJob(Job newJob)
    {
      // something is going wrong.  GetUsername is not working. It's like there is no User.
      // It would help if I understood what is going on with the User and the ClaimPrincipal stuff.
      var username = User.GetUsername();

      var user = await _userRepository.GetUserByUsernameAsync(username);

      var job = new Job
      {
        Url = newJob.Url,
        Title = newJob.Title,
        Description = newJob.Description,
        Company = newJob.Company,
        Created = DateTime.Now,
        Notes = newJob.Notes,
        IsActive = newJob.IsActive,
        AppUser = user,
        AppUserId = user.Id
      };

      user.Jobs.Add(job);

      if (await _userRepository.SaveAllAsync())
      {
        return _mapper.Map<JobDto>(job);
      }

      return BadRequest("Problem adding job.");

    }

    // [HttpPut]
    // public async Task<ActionResult> UpdateUser(SeekerUpdateDto seekerUpdateDto)
    // {
    //   var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    // }

  }
}