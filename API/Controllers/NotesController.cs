using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class NotesController : BaseApiController
  {
    private readonly INoteRepository _noteRepository;
    private readonly IUserRepository _userRepository;
    public NotesController(IUserRepository userRepository, INoteRepository noteRepository)
    {
      _userRepository = userRepository;
      _noteRepository = noteRepository;
    }

    [HttpGet("{jobId}")]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetJobNotes(int jobId)
    {
      var notes = await _noteRepository.GetJobNotesAsync(jobId);
      return Ok(notes);
    }

    [HttpPost]
    public async Task<ActionResult<NoteDto>> CreateNote(CreateNoteDto createNoteDto)
    {
        var note = new Note
        {
            AuthorId = User.GetUserId(),
            JobId = createNoteDto.JobId,
            Content = createNoteDto.Content
        };

        _noteRepository.AddNote(note);

        if (await _noteRepository.SaveAllAsync())
        {
            return Ok();
        }

        return BadRequest("Something unexpected happened.");
    }
  }
}