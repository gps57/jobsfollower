using System;

namespace API.DTOs
{
  public class JobDto
  {
    public int Id { get; set; }
    public string Url { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Company { get; set; }
    public DateTime Created { get; set; }
    public string Notes { get; set; }
    public bool IsActive { get; set; } = true;    
  }
}