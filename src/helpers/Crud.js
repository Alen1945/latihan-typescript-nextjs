import fetch from "isomorphic-unfetch";

export const GetData = async (url) => {
  try {
    const response = await fetch(url);
    const resjson = await response.json();
    console.log("ini", resjson);
    return resjson;
  } catch (err) {
    throw err;
  }
};
