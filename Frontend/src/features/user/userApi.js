export const fetchLoggedInUserOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `/orders/login-user`
      );
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchLoggedInUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`users/current-user`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  });
};

export const updateUser = (update) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/users/update-user`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject(error);
    }
  });
};
