using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class SeekerDto
    {
       public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public ICollection<JobDto> Jobs { get; set; }        
    }
}