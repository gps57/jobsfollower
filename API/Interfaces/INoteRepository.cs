using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface INoteRepository
    {
        void AddNote(Note note);
        void DeleteNote(Note note);
        Task<Note> GetNote(int id);
        Task<IEnumerable<Note>> GetJobNotes(Job jobId);
        Task<bool> SaveAllAsync();
        
    }
}