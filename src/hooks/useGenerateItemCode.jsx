import { useMemo } from "react";
import { showToast } from "../utils/toastUtils";
const useGenerateItemCode = () => {
  const generateCode = (wholesalerName, purchaseDate, costPrice, markedPrice, numItems) => {
    showToast(`Generating code with inputs: ${wholesalerName}, ${purchaseDate}`, 'success');
    
    if (!wholesalerName || !purchaseDate || !costPrice || !markedPrice || !numItems) {
      showToast("Missing required inputs for code generation", 'error');
      return ""; // Return empty if any required input is missing
    }

    try {
      // Step 1: Convert wholesaler name's first and last characters to corresponding numbers
      const start = wholesalerName[0].toUpperCase().charCodeAt(0) - 64; // 'A' → 1
      const end = wholesalerName.slice(-1).toUpperCase().charCodeAt(0) - 64; // 'B' → 2

      // Step 2: Transform marked price
      const markedPriceTransformed = "B" + markedPrice.toString().slice(0, -2).split("").reverse().join("");

      // Step 3: Transform cost price
      const costPriceTransformed = "K" + costPrice.toString().slice(0, -2).split("").reverse().join("");

      // Step 4: Convert purchase date
      const [year, month, day] = purchaseDate.split("-");
      const monthAbbr = [
        "BAI", "JES", "ASH", "SHR", "BHA", "ASH", "KAR", "MAN", "POU", "MAG", "FAL", "CHA"
      ];
      const monthName = monthAbbr[parseInt(month) - 1]; // Month 12 → 'CHA'
      const dateTransformed = `${year.slice(2)}${monthName}${day}`; // '2082-12-16' → '82CHA16'

      // Step 5: Combine all parts to generate the product code
      const productCode = `${start}-${markedPriceTransformed}-${dateTransformed}-${costPriceTransformed}-${numItems}-${end}`;
      
      showToast(`Product code generated: ${productCode}`, 'success');
      return productCode;
    } catch (error) {
      showToast("Error generating product code", 'error');
      return ""; // Return empty string on error
    }
  };

  return { generateCode };
};

export default useGenerateItemCode;