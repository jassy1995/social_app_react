
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(+value);
};

export const parseJsonString = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

export const errorHandler = function (error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};


