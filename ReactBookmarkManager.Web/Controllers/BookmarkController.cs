using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using ReactBookmarkManager.Data;
using ReactBookmarkManager.Web.ViewModels;

namespace ReactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.AddBookmark(bookmark);
        }

        [HttpGet]
        [Route("mybookmarks")]
        public List<Bookmark> GetMyBookmarks(int userId)
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookmarks(userId);
        }

        [HttpGet]
        [Route("top")]
        public Dictionary<string, int> Top()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopBookmarks(5);
        }

        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookmark(DeleteViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(vm.Id);
        }

        [HttpPost]
        [Route("updatetitle")]
        public void UpdateTitle(UpdateTitleViewModel viewModel)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.UpdateTitle(viewModel.Id, viewModel.Title);
        }


    }
}