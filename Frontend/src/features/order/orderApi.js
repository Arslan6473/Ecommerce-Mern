export const createOrder = (order) => {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/create",{
      method:"POST",
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({ data });
  });
};

export const updateOrder = (updatedOrder) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders/update/${updatedOrder._id}`,{
      method:"PATCH",
      body:JSON.stringify(updatedOrder),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({ data });
  });
};


export const fetchAllOrders = (pagination) => {
  let qureyStr = ''
  for (let key in pagination){
    qureyStr += `${key}=${pagination[key]}&`
  } 
return new Promise(async (resolve) => {
  const response = await fetch(`/orders/?${qureyStr}`);
  const data = await response.json();
  resolve({ data });
});
};

