import React, { useState } from 'react';
import axios from 'axios';

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/books?search=${searchTerm}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleIssueBook = async () => {
    if (!selectedBook) return alert("Select a book to issue");
    try {
      await axios.post(`/api/transactions/issue`, { bookId: selectedBook.id });
      alert("Book issued successfully!");
    } catch (error) {
      console.error("Error issuing book", error);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Search Books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <label>
              <input
                type="radio"
                value={book.id}
                checked={selectedBook?.id === book.id}
                onChange={() => setSelectedBook(book)}
              />
              {book.title} by {book.author}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleIssueBook}>Issue Selected Book</button>
    </div>
  );
};

export default TransactionsPage;
