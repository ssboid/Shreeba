import React, { useState } from 'react';

function MultiSelect({ label, options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((opt) => opt !== value)
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="multi-select">
      <label>{label}</label>
      <div className="custom-dropdown" onClick={toggleDropdown}>
        <div className="dropdown-header">
          {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'All'}
        </div>
        {dropdownOpen && (
          <div className="dropdown-body">
            {options.map((option) => (
              <label key={option} className="dropdown-item">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={handleCheckboxChange}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiSelect;
