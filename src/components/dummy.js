const handleChange = (key, val) => {
  setMsg("");
  const { valid, error } = validate1(key, val);

  dispatch({ type: "update",  { key, val, touched: true, valid, error } });

  let formValid = true;
  for (let v in customer) {
    if (customer[v].valid === false) {
      formValid = false;
      break;
    }
  }

  dispatch({ type: "update",  { key: "formValid", val: formValid } });
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      const { key, val, touched, valid, error, formValid } = action.data;
      return { ...state, [key]: { value: val, error, touched, valid }, formValid };
    case "reset":
      return init;
    default:
      break;
  }
};