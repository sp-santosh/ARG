import myDataSource from "./datasource.js";

export const connectToDb = async () => {
  try {
    await myDataSource.initialize();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
