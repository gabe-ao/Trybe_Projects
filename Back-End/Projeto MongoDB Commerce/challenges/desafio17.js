db.resumoProdutos.insert({
  franquia: "McDonalds",
  totalProdutos: NumberInt(5),
});

db.resumoProdutos.find({}, { _id: 0, franquia: 1, totalProdutos: 1 });