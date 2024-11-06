import React, { useState, useEffect } from 'react';

function UpdateBookPage({ fetchBookOrMovieDetails, onUpdateBookOrMovie }) {
    const [mediaType, setMediaType] = useState('book'); // Default to 'book'
    const [selectedItem, setSelectedItem] = useState('');
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [authorOrDirector, setAuthorOrDirector] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Fetch available books or movies based on media type
        const fetchItems = async () => {
            try {
                const itemsList = await fetchBookOrMovieDetails(mediaType); // Fetch items based on media type
                setItems(itemsList);
            } catch (error) {
                console.error("Error fetching items:", error);
                alert("Failed to fetch items. Please try again.");
            }
        };

        fetchItems();
    }, [mediaType]);

    useEffect(() => {
        // Pre-populate fields when a selection is made
        const selectedItemDetails = items.find(item => item.id === selectedItem);
        if (selectedItemDetails) {
            setTitle(selectedItemDetails.title);
            setAuthorOrDirector(selectedItemDetails.authorOrDirector);
            setGenre(selectedItemDetails.genre);
            setReleaseDate(selectedItemDetails.releaseDate);
            setRating(selectedItemDetails.rating || '');
            setDescription(selectedItemDetails.description);
        }
    }, [selectedItem, items]);

    const handleMediaTypeChange = (e) => {
        setMediaType(e.target.value);
    };

    const handleItemChange = (e) => {
        setSelectedItem(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an updated item object
        const updatedItem = {
            id: selectedItem,
            title,
            authorOrDirector,
            genre,
            releaseDate,
            mediaType,
            rating: mediaType === 'movie' ? rating : undefined, // Rating is only for movies
            description,
        };

        try {
            await onUpdateBookOrMovie(updatedItem); // Call the onUpdateBookOrMovie function passed from parent
            alert(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} updated successfully!`);

            // Reset fields after successful update
            setTitle('');
            setAuthorOrDirector('');
            setGenre('');
            setReleaseDate('');
            setRating('');
            setDescription('');
            setSelectedItem('');
        } catch (error) {
            console.error("Error updating item:", error);
            alert(`Failed to update the ${mediaType}. Please try again.`);
        }
    };

    return (
        <div className="update-book-page">
            <h2>Update {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</h2>
            
            {/* Media Type Selection */}
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

            {/* Item Selection */}
            <div>
                <label htmlFor="item">Select {mediaType === 'book' ? 'Book' : 'Movie'}:</label>
                <select
                    id="item"
                    value={selectedItem}
                    onChange={handleItemChange}
                    required
                >
                    <option value="">--Select--</option>
                    {items.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Form Fields */}
            {selectedItem && (
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

                    <button type="submit">Update {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</button>
                </form>
            )}
        </div>
    );
}

export default UpdateBookPage;
