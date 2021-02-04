using System;

namespace API.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public AppUser Author { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
    }
}