db.produtos.countDocuments(
  { nome: { $regex: /mc/i } },
);