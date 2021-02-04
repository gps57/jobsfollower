using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
  public class NoteRepository : INoteRepository
  {
    private readonly DataContext _context;
    public NoteRepository(DataContext context)
    {
      _context = context;
    }

    public void AddNote(Note note)
    {
      _context.Notes.Add(note);
    }

    public void DeleteNote(Note note)
    {
      throw new System.NotImplementedException();
    }

    public Task<IEnumerable<Note>> GetJobNotes(Job jobId)
    {
      throw new System.NotImplementedException();
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