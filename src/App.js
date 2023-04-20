import './App.css';
import { useState } from "react";
import Header from './Header';
import SearchResults from "./SearchResults";

function App() {


    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);
    const [numberOfPosts, setNumberOfPosts] = useState(0);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleSearchClick = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                const matchingPosts = data.filter((post) =>
                    post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
                ).slice(0, numberOfPosts);

                Promise.all(
                    matchingPosts.map((post) =>
                        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                            .then((response) => response.json())
                            .then((user) => {
                                post.name = user.name;
                                post.puste = "\n";
                                return post;
                            })
                    )
                ).then((postsWithUserData) => {
                    setPosts(postsWithUserData);
                    setSearchTerm('');
                });
            });
    };

    const handleCommentClick = (postId) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                return {
                    ...post,
                    commentsShown: !post.commentsShown,
                    comments: post.commentsShown ? [] : post.comments
                };
            }
            return post;
        });

        setPosts(updatedPosts);
    };

    const handleNumberOfPostsChange = (number) => {
        setNumberOfPosts(number);
    };

    return (
        <body>
        <div className="App">
            <Header
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleKeyDown={handleKeyDown}
                handleSearchClick={handleSearchClick}
                handleNumberOfPostsChange={handleNumberOfPostsChange}
                numberOfPosts={numberOfPosts}
            />
            <br/>
            <br/>
            <br/>
            <br/>
            <div className={"App-body"}>
            <SearchResults posts={posts} handleCommentClick={handleCommentClick} />
            </div>
        </div>
        </body>
    );
}

export default App;
