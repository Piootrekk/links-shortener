const shortUrlGenerate = (min: number = 2, max: number = 6): string => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  const words =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < random; i++) {
    result += words.charAt(Math.floor(Math.random() * words.length));
  }
  return result;
};

export default shortUrlGenerate;
