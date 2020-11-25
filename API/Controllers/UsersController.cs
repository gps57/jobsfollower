using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
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

  }
}