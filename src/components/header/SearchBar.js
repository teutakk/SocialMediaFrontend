import React, { useState, useEffect, useRef } from "react";
// import { data } from "../../api/dummyData";
import search from "./SearchBar.module.css";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  // useEffect(() => {
  //   const query = searchText.toLowerCase();
  //   const filteredUsers = data.filter((user) => {
  //     const fullName = user.firstName.toLowerCase();
  //     return fullName.includes(query);
  //   });

  //   setSearchResults(filteredUsers);
  // }, [searchText]);

  // const handleDocumentClick = (e) => {
  //   if (inputRef.current && !inputRef.current.contains(e.target)) {
  //     setIsDropdownVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isDropdownVisible) {
  //     document.addEventListener("click", handleDocumentClick);
  //   } else {
  //     document.removeEventListener("click", handleDocumentClick);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, [isDropdownVisible]);

  return (
    <div ref={inputRef} style={{ position: "relative" }}>
      <label className={search.search}>
        <input
          type="text"
          placeholder="Search"
          id="search"
          name="search"
          value={searchText}
          onChange={(e) => {
            const inputValue = e.target.value;
            // setSearchText(inputValue);
            // setIsDropdownVisible(!!inputValue);
          }}
        />
        <span>
          <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10 6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-.691 3.516a4.5 4.5 0 11.707-.707l2.838 2.837a.5.5 0 01-.708.708L9.31 10.016z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>

      {isDropdownVisible && (
        <div className={search.searchUl}>
          {searchResults.map((user) => (
            <div key={user.id} className={search.searchLi}>
              <img
                src={user.profilePhoto}
                alt={`${user.userFullName}'s Avatar`}
                className="user-avatar"
              />
              <div className={search.userFullName}>{user.userFullName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
