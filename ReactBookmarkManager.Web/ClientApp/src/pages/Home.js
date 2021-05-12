import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [topBookmarks, setTopBookmarks] = useState([]);

    useEffect(() => {
        const loadTopBookmarks = async () => {
            const { data } = await axios.get('api/bookmark/top');

            var top = Object.keys(data).map(function (key) {
                return [key, data[key]];
            });

            setTopBookmarks(top.sort((a,b) => b[1] - a[1]));
        }

        loadTopBookmarks();
    }, []);

    return (
        <>
            <h1>Welcome to the coolest Bookmark Application ever!</h1>
            <h3>Check out the top 5 most bookmarked links:</h3>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                  <tbody>
                    {topBookmarks.map(([url,count]) => {
                        return <tr>
                            <td><a href={url} target="_blank">{url}</a></td>
                            <td>{count}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Home;
