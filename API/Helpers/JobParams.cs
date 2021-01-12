namespace API.Helpers
{
    public class JobParams : PaginationParams
    {
        public string Company { get; set; }
        public string Title { get; set; }
        public string OrderBy { get; set; } = "created";
    }

}