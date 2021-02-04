using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface INoteRepository
    {
        void AddNote(Note note);
        void DeleteNote(Note note);
        Task<Note> GetNote(int id);
        Task<IEnumerable<NoteDto>> GetJobNotesAsync(int jobId);
        Task<bool> SaveAllAsync();
        
    }
}