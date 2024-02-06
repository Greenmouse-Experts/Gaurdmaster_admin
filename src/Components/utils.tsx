// export const capitalizeFirstLetter = (string: string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
  
//   export const formatName = (string: string, number: number) => {
//     if (string.length > number) {
//       return string.substring(0, number).concat('...');
//     } else return string;
//   };
  
//   export const classNames = (...classes: string[]) => {
//     return classes.filter(Boolean).join(' ');
//   };
  
//   export const formatNumber = (value: number | string) => {
//     if (!value) return '';
//     return `${value
//       .toLocaleString('en-US')
//       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   };
  
//   export const formatAsNgnMoney = (value: number | string) => {
//     if (!value) return '';
//     return `₦${value
//       .toLocaleString('en-US')
//       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   };
  
  // export const isNumber = (value: string | number) => {
  //   return typeof value === "number";
  // };
  
  // export const FilterWords = (words: string[], value: string) => {
  //   let filtered = value;
  //   words.forEach((word: string) => {
  //     filtered = filtered.replace(new RegExp(word, "gi"), ""); // 'gi' for global and case-insensitive matching
  //   });
  //   return filtered;
  // };

  // export const getPageCount = (count: number, limit: number) => {
  //   const pageCount = Math.ceil(count / limit);
  //   return pageCount;
  // };
  
  // export const generatePaginationNumbers = (
  //   currentPage: number,
  //   totalPages: number
  // ) => {
  //   const pagesToShow = 4;
  //   const paginationNumbers = [];
  
  //   for (let i = 1; i <= Math.min(pagesToShow, totalPages - 2); i++) {
  //     paginationNumbers.push(i);
  //   }
  //   if (currentPage > pagesToShow) {
  //     paginationNumbers.push("...");
  //   }
  //   if (totalPages > pagesToShow) {
  //     paginationNumbers.push("...");
  //     for (let i = totalPages - 1; i <= totalPages; i++) {
  //       paginationNumbers.push(i);
  //     }
  //   }
  //   return paginationNumbers;
  // };

  