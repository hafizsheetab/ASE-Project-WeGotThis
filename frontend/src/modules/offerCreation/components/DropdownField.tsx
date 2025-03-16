import { useState, useRef, useEffect } from "react";
import styles from "./DropdownField.module.css"; 
import inputStyles from './TextInputField.module.css'

type DropdownFieldProps = {
    radioItems : string[]
}

export const DropdownField : React.FC<DropdownFieldProps> = ({radioItems}) => {
  const [priceType, setPriceType] = useState(radioItems[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelection = (type : string) => {
    setPriceType(type)
    setShowDropdown(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={inputStyles.inputGroup}>
      <label className={inputStyles.label}>Price Type:</label>

      <div className={styles.customDropdown} ref={dropdownRef}>
        <button 
        className={styles.selectButton}
        onClick={(e) => {
            e.preventDefault();
            setShowDropdown((prev) => !prev);
        }}>
            <span className={styles.selectValue}>{priceType}</span>
            <span className={styles.arrow}></span>
        </button>

        {showDropdown && (
            <ul className={styles.selectDropdown}>
                {radioItems.map((item) => (
                    <li key={item} onClick={() => handleSelection(item)}>{item}</li>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownField;
