export const generateOrderNumber = () => {
  // Generates a random 6-digit number, e.g. "MNS-839210"
  const random = Math.floor(100000 + Math.random() * 900000);
  return `MNS-${random}`;
};