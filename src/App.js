import './App.css';

import Header from './Header';
import SearchResults from "./SearchResults";
import handleCommentClick from './handleComment';
import handlePhotoClick from "./handlePhotosClick";
import handleMainSide from "./handleMainSide";

function App() {

    //ToDO logowanie

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    //TODO KONIEC

    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);

    const [numberOfPosts, setNumberOfPosts] = useState(5);
    const [numberFromInput, setNumberFromInput] = useState(10);
    const [numberToInput, setNumberToInput] = useState(50);


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
                    post.title.length >= numberFromInput &&
                    post.title.length <= numberToInput &&
                    post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
                ).slice(0, numberOfPosts);

                Promise.all(
                    matchingPosts.map((post) =>
                        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                            .then((response) => response.json())
                            .then((user) => {
                                post.name = user.name;
                                return post;
                            })
                    )
                ).then((postsWithUserData) => {
                    const remainingPostsCount = numberOfPosts - postsWithUserData.length;
                    if (remainingPostsCount > 0) {
                        fetch('https://jsonplaceholder.typicode.com/albums')
                            .then((response) => response.json())
                            .then((data) => {
                                const matchingAlbums = data.filter((album) =>
                                    album.title.length >= numberFromInput &&
                                    album.title.length <= numberToInput &&
                                    album.title.toLowerCase().startsWith(searchTerm.toLowerCase())
                                ).slice(0, remainingPostsCount);

                                Promise.all(
                                    matchingAlbums.map((album) =>
                                        fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
                                            .then((response) => response.json())
                                            .then((user) => {
                                                album.author = user.name;
                                                return album;
                                            })
                                    )
                                ).then((albumsWithUserData) => {
                                    const combinedResults = [...postsWithUserData, ...albumsWithUserData];
                                    combinedResults.sort(() => Math.random() - 0.5);
                                    setAlbums(albumsWithUserData);
                                    setPosts(postsWithUserData);
                                    setSearchTerm('');
                                });
                            });
                    } else {
                        setPosts(postsWithUserData);
                        setSearchTerm('');
                    }
                });
            });
    };


    const handleNumberOfPostsChange = (number) => {
        setNumberOfPosts(number);
    };

    const handleNumberInputFromChange = (numberFrom) => {
        setNumberFromInput(numberFrom);
    };
    const handleNumberInputToChange = (numberTo) => {
        setNumberToInput(numberTo);
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
                handleMainSideClick={() => handleMainSide(setPosts,numberOfPosts, setAlbums)}
                numberOfPosts={numberOfPosts}
                handleFromChange={handleNumberInputFromChange}
                handleToChange={handleNumberInputToChange}

            />
            <br />
            <br />
            <br />
            <br />
            <div>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
            <div className={"App-body"}>
                <div className="spinner"></div>
                <SearchResults posts={posts} albums={albums} handleCommentClick={(postId) => handleCommentClick(postId, posts, setPosts)} handlePhotoClick={(albumId) => handlePhotoClick(albumId, albums, setAlbums)}/>
            </div>
        </div>
        </body>
    );
}

export default App;
