import React, { useState } from 'react';
import searchResults from "./SearchResults";
import {LoginSocialGoogle} from "reactjs-social-login";
import {GoogleLoginButton} from "react-social-login-buttons";

function Header(props) {
    const { searchTerm, handleSearchChange, handleKeyDown, handleSearchClick, handleNumberOfPostsChange, numberOfPosts, handleMainSideClick, handleFromChange, handleToChange, to, from } = props;

    const [numberInput, setNumberInput] = useState(numberOfPosts);

    const [numberToInput, setNumberToInput] = useState(to);
    const [numberFromInput, setNumberFromInput] = useState(from);

    const handleNumberToChange = (event) => {
        setNumberToInput(event.target.value);
    };

    const handleNumberInputToBlur = () => {
        handleToChange(parseInt(numberToInput));
    };

    const handleNumberChange = (event) => {
        setNumberInput(event.target.value);
    };

    const handleNumberInputBlur = () => {
        handleNumberOfPostsChange(parseInt(numberInput));
    };

    const handleNumberFromChange = (event) => {
        setNumberFromInput(event.target.value);
    };

    const handleNumberInputFromBlur = () => {
        handleFromChange(parseInt(numberFromInput));
    };


    const handleMainSideClick1 = () =>  {
        handleMainSideClick()
    };

    return (
        <header>
            <h2 className="App-Logo">
                <a href="button">
                ByteBusters
                </a>
            </h2>
            <div className="search-box">
                <div className="search-icon">
                    <i className="fas fa-search"></i>
                </div>
                <input type="text" className="search-bar-input" placeholder="Search" value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
            </div>
            <div>
                <input type="number" min="0" className="number-input" placeholder="Number" onChange={handleNumberChange} value={numberInput}  onBlur={handleNumberInputBlur} />
            </div>
            <div>
                <input type="number" min="0" className="number-input"  placeholder="From"  onChange={handleNumberFromChange}  value={numberFromInput} onBlur={handleNumberInputFromBlur}  />
            </div>
            <div>
                <input type="number" min="0" className="number-input"  placeholder="To"  onChange={handleNumberToChange} value={numberToInput}  onBlur={handleNumberInputToBlur} />
            </div>
            <div>
                <button id = "main-side-button" className="showcomments" placeholder="RandomPosts" onClick={handleMainSideClick1}>Main Side</button>
            </div>
           
            <div>
                <LoginSocialGoogle
                    client_id={"282258299718-k1t8jhiesr3k7iguk7qaoi50gbd13aob.apps.googleusercontent.com"}

                    onReject={(err)=> {
                        console.log(err);
                    }}
                    onResolve={({provider,data})=> {
                        console.log(provider, data);
                    }}
                >
                    <GoogleLoginButton/>
                </LoginSocialGoogle>
            </div>
        </header>
    );
}
export default Header;
