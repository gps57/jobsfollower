using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class NoteRepository : INoteRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public NoteRepository(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public void AddNote(Note note)
    {
      _context.Note.Add(note);
    }

    public void DeleteNote(Note note)
    {
      throw new System.NotImplementedException();
    }

    public async Task<IEnumerable<NoteDto>> GetJobNotesAsync(int jobId)
    {      
      return await _context.Note
        .Where(n => n.JobId == jobId)
        .ProjectTo<NoteDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public Task<Note> GetNote(int id)
    {
      throw new System.NotImplementedException();
    }

    public async Task<bool> SaveAllAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }
  }
}