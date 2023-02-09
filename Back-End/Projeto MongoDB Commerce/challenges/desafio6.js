db.produtos.find(
  { curtidas: { $gt: 10, $lt: 100 } },
  { _id: 0, nome: 1, curtidas: 1 },
);