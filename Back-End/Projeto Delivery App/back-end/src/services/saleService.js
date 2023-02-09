const { Sales } = require('../database/models');

const getSaleBuId = async (id) => {
  const getByid = await Sales.findOne({
    where: {
      id,
    },
  });
  return getByid;
};

module.exports = {
  getSaleBuId,
};
