const randomOrderNumber = () => {
  const chars = "0123456789";
  let str = "C";

  for (let i = 0; i < 7; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return str;
};

module.exports = {
  randomOrderNumber,
};
