import AddProduct from "./AddProduct";

// EditProduct shares the same layout as AddProduct but pre-filled
export default function EditProduct() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-sm text-muted-foreground">Update pricing, media, availability, and variant data without leaving the catalog flow.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Reset</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Save draft</button>
          <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Update product</button>
        </div>
      </div>
      <AddProduct />
    </div>
  );
}