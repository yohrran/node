const fortune = [
  "Conquer your fears or they will conquer you",
  "everone hello",
  "i am boy",
];

exports.getFortune = () => {
  const idx = Math.floor(Math.random() * fortune.length);
  return fortune[idx];
};
