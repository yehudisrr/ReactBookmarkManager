import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function BookmarkRow({ bookmark }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(bookmark.title);
    const history = useHistory();

    const onUpdateClick = async title => {
        await axios.post('/api/bookmark/updatetitle', { id: bookmark.id, title });
        setIsEditing(false);
        bookmark.title = title;
        history.push('/mybookmarks');
    }

    const onDeleteClick = async id => {
        await axios.post('/api/bookmark/deletebookmark', { id });
        history.push('/mybookmarks');
    }
  
    return (
        <tr>
            <td>
                {isEditing ?
                    <input onChange={e => setTitle(e.target.value)}
                        defaultValue={bookmark.title}
                        type="text"
                        name="title"
                        className="form-control" />
                    : bookmark.title}
            </td>
            <td>
                <a href={bookmark.url} target="_blank">{bookmark.url}</a>
            </td>
            <td>
                {isEditing ?
                  <><button
                        onClick={() => onUpdateClick(title)}
                        className="btn btn-outline-success">Update
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="btn btn-outline-info">Cancel
                    </button></>
                  :  <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-outline-primary">Edit Title
                    </button>
                }
                    <button
                        style={{ marginLeft: 10 }}
                        onClick={() => onDeleteClick(bookmark.id)}
                        className="btn btn-outline-danger">Delete
                    </button>
            </td>
        </tr>
    );
}

export default BookmarkRow;
