using System;

namespace API.DTOs
{
    public class NoteDto
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string AuthorPhotoUrl { get; set; }
        public int JobId { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
    }
}