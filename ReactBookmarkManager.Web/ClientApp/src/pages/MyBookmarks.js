import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import BookmarkRow from '../components/BookmarkRow';

const MyBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const loadBookmarks = async () => {
            const { data } = await axios.get(`api/bookmark/mybookmarks?userId=${user.id}`);
            setBookmarks(data);
        }

        loadBookmarks();
    }, []);

 
     return (
        <>
            <h1>Hi {user.firstName} {user.lastName}!</h1>
            <a href="/addbookmark" className="btn btn-primary btn-lg">Add Bookmark</a>
            <br></br>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(b => 
                        <BookmarkRow
                            key={b.id}
                            bookmark={b}
                        />)}
                </tbody>
            </table>
        </>
    )
}

export default MyBookmarks;