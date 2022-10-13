export const paginate = (prodList) => {
  const itemsPerPage = 6;
  const numberOfPages = Math.ceil(prodList?.length / itemsPerPage);

  const newProdList = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return prodList.slice(start, start + itemsPerPage);
  });

  return newProdList;
};
