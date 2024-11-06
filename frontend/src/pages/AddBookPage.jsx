import React, { useState } from 'react';

function AddBookPage({ onAddBook }) {
    // State for form fields
    const [title, setTitle] = useState('');
    const [authorOrDirector, setAuthorOrDirector] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [mediaType, setMediaType] = useState('book'); // Default is 'book'
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    // Handle media type change (book or movie)
    const handleMediaTypeChange = (e) => {
        setMediaType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an object to send to the backend
        const newEntry = {
            title,
            authorOrDirector,
            genre,
            releaseDate,
            mediaType,
            rating,
            description,
        };

        try {
            // Call the onAddBookOrMovie function passed from parent
            await onAddBook(newEntry); // Or replace with a POST request to backend API
            alert(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} added successfully!`);

            // Reset form fields after successful submission
            setTitle('');
            setAuthorOrDirector('');
            setGenre('');
            setReleaseDate('');
            setMediaType('book');
            setRating('');
            setDescription('');
        } catch (error) {
            console.error("Error adding new entry:", error);
            alert(`Failed to add the ${mediaType}. Please try again.`);
        }
    };

    return (
        <div className="add-book-page">
            <h2>Add New {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="authorOrDirector">
                        {mediaType === 'book' ? 'Author' : 'Director'}:
                    </label>
                    <input
                        type="text"
                        id="authorOrDirector"
                        value={authorOrDirector}
                        onChange={(e) => setAuthorOrDirector(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="releaseDate">
                        {mediaType === 'book' ? 'Publication Date' : 'Release Date'}:
                    </label>
                    <input
                        type="date"
                        id="releaseDate"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                    />
                </div>

                {mediaType === 'movie' && (
                    <div>
                        <label htmlFor="rating">Rating:</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min={1}
                            max={10}
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="mediaType">Media Type:</label>
                    <select
                        id="mediaType"
                        value={mediaType}
                        onChange={handleMediaTypeChange}
                    >
                        <option value="book">Book</option>
                        <option value="movie">Movie</option>
                    </select>
                </div>

                <button type="submit">Add {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</button>
            </form>
        </div>
    );
}

export default AddBookPage;
