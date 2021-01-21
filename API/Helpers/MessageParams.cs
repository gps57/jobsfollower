namespace API.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string Username { get; set; }  // currently logged in user
        public string Container { get; set; } = "Unread";
    }
}