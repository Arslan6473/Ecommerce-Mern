export const addToCart = (item) => {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/add-item", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
};

export const fetchAllCartItems = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/cart/user-items`
    );
    const data = await response.json();
    resolve({ data });
  });
};

export const updateCart = (update) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/cart/update/${update.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

export const deleteCartItem = (itemid) => {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/cart/delete/${itemid}`,
      {
        method: "DELETE",

        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
};

export const resetCart = () => {
  return new Promise(async (resolve) => {
    const response = await fetchAllCartItems();
    const items = response.data;
    for (let item of items) {
      await deleteCartItem(item._id);
    }

    resolve({ status: "successfull" });
  });
};
