import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = Express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(Express.json({ limit: "16kb" }));
app.use(Express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(Express.static("dist"));
app.get('*', (req, res) =>
  res.sendFile(path.resolve('dist', 'index.html'))
);

//Routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

export { app };
