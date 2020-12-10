using System;

namespace API.DTOs
{
    public class JobUpdateDto
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        // public DateTime Applied { get; set; }
    }
}