import { useMemo } from "react";

const useGenerateItemCode = () => {
  const generateCode = (wholesalerName, purchaseDate, costPrice, markedPrice, numItems) => {
    if (!wholesalerName || !purchaseDate || !costPrice || !markedPrice || !numItems) {
      return ''; // Return empty if any required input is missing
    }

    // Step 1: Convert wholesaler name's first and last characters to corresponding numbers
    const start = wholesalerName[0].toUpperCase().charCodeAt(0) - 64; // 'A' → 1
    const end = wholesalerName.slice(-1).toUpperCase().charCodeAt(0) - 64; // 'B' → 2

    // Step 2: Transform marked price
    const markedPriceTransformed = 'B' + markedPrice.toString().slice(0, -2).split('').reverse().join('');
    // Example: '8000' → '80' → '08' → 'B08'

    // Step 3: Transform cost price
    const costPriceTransformed = 'K' + costPrice.toString().slice(0, -2).split('').reverse().join('');
    // Example: '5600' → '56' → '65' → 'K65'

    // Step 4: Convert purchase date
    const [year, month, day] = purchaseDate.split('-');
    const monthAbbr = [
      'BAI', 'JES', 'ASH', 'SHR', 'BHA', 'ASH', 'KAR', 'MAN', 'POU', 'MAG', 'FAL', 'CHA'
    ];
    const monthName = monthAbbr[parseInt(month) - 1]; // Month 12 → 'CHA'
    const dateTransformed = `${year.slice(2)}${monthName}${day}`; // '2082-12-16' → '82CHA16'

    // Step 5: Combine all parts to generate the product code
    return `${start}-${markedPriceTransformed}-${dateTransformed}-${costPriceTransformed}-${numItems}-${end}`;
  };

  return { generateCode };
};

export default useGenerateItemCode;
