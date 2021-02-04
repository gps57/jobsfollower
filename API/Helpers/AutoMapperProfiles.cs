using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, SeekerDto>()
            .ForMember(
                dest => dest.PhotoUrl, opt => opt.MapFrom(
                    src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
        CreateMap<Photo, PhotoDto>();
        CreateMap<SeekerUpdateDto, AppUser>();
        CreateMap<Job, JobDto>();
        CreateMap<JobUpdateDto, Job>();
        CreateMap<RegisterDto, AppUser>();
        CreateMap<Message, MessageDto>()
          .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src =>
            src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
          .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src =>
            src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
        CreateMap<Note, NoteDto>()
          .ForMember(dest => dest.AuthorPhotoUrl, opt => opt.MapFrom(src =>
            src.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
    }
  }
}