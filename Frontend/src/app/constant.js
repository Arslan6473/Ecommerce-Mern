export const ITEMS_PER_PAGE = 12;
export const productPrice=(product)=>{
return Math.round(product.price * (1 - product.discountPercentage / 100))
}