export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
};

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/users/signOut",{
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
};

export const logInUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/users/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
};
