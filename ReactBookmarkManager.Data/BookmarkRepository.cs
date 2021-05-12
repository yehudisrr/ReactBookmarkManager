using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBookmarkManager.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkContext(_connectionString);
            ctx.Bookmarks.Add(bookmark);
            ctx.SaveChanges();
        }
        public List<Bookmark> GetBookmarks(int userId)
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.Bookmarks.Where(b => b.UserId == userId).ToList();
        }
        public Dictionary<string, int> GetTopBookmarks(int num)
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.Bookmarks.GroupBy(b => b.Url)
                                .OrderByDescending(g => g.Count())
                                .Take(num)
                                .Select(g => new { Url = g.Key, Count = g.Count() })
                                .ToDictionary(b => b.Url, b => b.Count);
        }
        public void DeleteBookmark(int id)
        {
            using var context = new BookmarkContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }

        public void UpdateTitle(int id, string title)
        {
            using var context = new BookmarkContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(
                $"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

    }
}