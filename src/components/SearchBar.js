import React, { useState, useEffect, useRef } from "react";
import { data } from "../api/dummyData";
import search from "./SearchBar.module.css";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const query = searchText.toLowerCase();
    const filteredUsers = data.filter((user) => {
      const fullName = user.userFullName.toLowerCase();
      return fullName.includes(query);
    });

    setSearchResults(filteredUsers);
  }, [searchText]);

  const handleDocumentClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDropdownVisible]);

  return (
    <div ref={inputRef}>
      <input
        type="text"
        placeholder="Search"
        id="search"
        name="search"
        style={{ paddingLeft: "30px" }}
        className={search.searchInput}
        value={searchText}
        onChange={(e) => {
          const inputValue = e.target.value;
          setSearchText(inputValue);
          setIsDropdownVisible(!!inputValue);
        }}
      />

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
