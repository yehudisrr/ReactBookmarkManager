﻿using Microsoft.EntityFrameworkCore;

namespace ReactBookmarkManager.Data
{
    public class BookmarkContext : DbContext
    {
        private readonly string _connectionString;

        public BookmarkContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}
