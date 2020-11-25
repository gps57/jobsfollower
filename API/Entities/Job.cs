using System;

namespace API.Entities
{
  public class Job
  {
    public int Id { get; set; }
    public string Url { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Company { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public string Notes { get; set; }
  }
}