using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class NotesController : BaseApiController
  {
    private readonly INoteRepository _noteRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public NotesController(IUserRepository userRepository, INoteRepository noteRepository, IMapper mapper)
    {
      _mapper = mapper;
      _userRepository = userRepository;
      _noteRepository = noteRepository;

    }

    [HttpGet("{jobId}")]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetJobNotes(int jobId)
    {
      var notes = await _noteRepository.GetJobNotesAsync(jobId);
      return Ok(notes);
    }

    [HttpPut]
    public async Task<ActionResult<NoteDto>> CreateNote(CreateNoteDto createNoteDto)
    {
      var user = await _userRepository.GetUserByIdAsync(User.GetUserId());
      var note = new Note
      {
        AuthorId = User.GetUserId(),
        Author = user,
        JobId = createNoteDto.JobId,
        Content = createNoteDto.Content,
        Created = DateTime.Now
      };

      _noteRepository.AddNote(note);

      if (await _noteRepository.SaveAllAsync())
      {
        return Ok(_mapper.Map<NoteDto>(note));
      }

      return BadRequest("Something unexpected happened.");
    }
  }
}