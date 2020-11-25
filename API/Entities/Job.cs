using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
  [Table("Jobs")]
  public class Job
  {
    public int Id { get; set; }
    public string Url { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Company { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public string Notes { get; set; }
    public bool IsActive { get; set; } = true;
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
  }
}