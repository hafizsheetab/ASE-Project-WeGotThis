import styles from "./Home.module.css";

const SearchFilters = () => {
  return (
    <div className={styles.searchFiltersContainer}>
      <div className={styles.searchFiltersRow}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />

        <select className={styles.select}>
          <option>All Categories</option>
          <option>Pets</option>
          <option>Gardening</option>
        </select>

        <select className={styles.select}>
          <option>Location</option>
          <option>NY</option>
          <option>LA</option>
        </select>

        <select className={styles.select}>
          <option>Price Range</option>
          <option>$0 - $50</option>
          <option>$50 - $100</option>
        </select>

        <select className={styles.select}>
          <option>Next Availability</option>
          <option>Today</option>
          <option>Tomorrow</option>
        </select>
      </div>

      <div className={styles.searchFiltersRow}>
        <select className={styles.select}>
          <option>Service Type</option>
          <option>Walking</option>
          <option>Pet Sitting</option>
        </select>

        <select className={styles.select}>
          <option>User's Rating</option>
          <option>4+ Stars</option>
          <option>3+ Stars</option>
        </select>

        <select className={styles.select}>
          <option>Estimated Duration</option>
          <option>1 hr</option>
          <option>2 hrs</option>
        </select>

        <button className={styles.advancedSearchButton}>Advanced Search</button>

        <select className={styles.select}>
          <option>Sort By</option>
          <option>Price</option>
          <option>Rating</option>
        </select>

        <button className={styles.searchButton}>Search</button>
      </div>

      <div className={styles.paginationRow}>
        <span className={styles.pageLink}>1</span>
        <span className={styles.pageLink}>2</span>
        <span className={styles.pageLink}>3</span>
        <span className={styles.pageLink}>...</span>
        <span className={styles.pageLink}>10</span>
      </div>
    </div>
  );
};

export default SearchFilters;
