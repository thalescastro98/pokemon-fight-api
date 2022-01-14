export const errorHandling = (res: any, error: any) => {
  console.log(error);
  return res
    .status(error.response.status ? error.response.status : 500)
    .send({ error: error.response.statusText ? error.response.statusText : 'Something went wrong.' });
};
