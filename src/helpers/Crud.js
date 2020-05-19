import fetch from "isomorphic-unfetch";

export const GetData = async (url) => {
  try {
    const response = await fetch(url);
    const resjson = await response.json();
    return resjson.Search;
  } catch (err) {
    throw err;
  }
};
