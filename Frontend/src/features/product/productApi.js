export const fetchAllProducts = () => {
  return new Promise(async (resolve) => {
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
};

export const fetchSingleProduct = (id) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
};

export const updateProduct = (updatedProduct) => {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/update/${updatedProduct._id}`,{
      method:"PATCH",
      body:JSON.stringify(updatedProduct),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({ data });
  });
};

export const createProduct = (productData) => {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/create",{
      method:"POST",
      body:JSON.stringify(productData),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({ data });
  });
};

export const fetchCategories = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(`/categories`);
    const data = await response.json();
    resolve({ data });
  });
};

export const fetchBrands = () => {
  return new Promise(async (resolve) => {
    const response = await fetch(`/brands`);
    const data = await response.json();
    resolve({ data });
  });
};

export const fetchFilterProducts = (filter,sort ,pagination,admin) => {

  let qureyStr = ''
 
  for (let key in filter){
    const lastFilter = filter[key]
   
    if(lastFilter.length){
      const lastFilterValue = lastFilter[lastFilter.length - 1]
      qureyStr += `${key}=${lastFilterValue}&`
    } 
  }

  for (let key in sort){
    qureyStr += `${key}=${sort[key]}&`
  }

  for (let key in pagination){
    qureyStr += `${key}=${pagination[key]}&`
  }

 if(admin){
  qureyStr += `admin=${admin}&`
 }
  return new Promise(async (resolve) => {
    const response = await fetch(`/products?${qureyStr}`);
    const data = await response.json();
    resolve({ data });
  });
};