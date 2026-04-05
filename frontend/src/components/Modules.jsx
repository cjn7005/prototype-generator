import { MyTable } from './MyTable';

export function Customer() {
	return <MyTable 
		table_name={["Customer","Customers"]}
		url={"http://127.0.0.1:5000/customers/"}
		columns={['customer_id', 'first_name', 'last_name', 'email', 'created_at']}
		column_names={['Customer Id', 'First Name', 'Last Name', 'Email', 'Created At']}
		pk={"customer_id"}
		/>
}

export function Address() {
	return <MyTable 
		table_name={["Address","Addresses"]}
		url={"http://127.0.0.1:5000/addresses/"}
		columns={['address_id', 'customer_id', 'line1', 'city', 'country']}
		column_names={['Address Id', 'Customer Id', 'Line1', 'City', 'Country']}
		pk={"address_id"}
		/>
}

export function Category() {
	return <MyTable 
		table_name={["Category","Categories"]}
		url={"http://127.0.0.1:5000/categories/"}
		columns={['category_id', 'name']}
		column_names={['Category Id', 'Name']}
		pk={"category_id"}
		/>
}

export function Product() {
	return <MyTable 
		table_name={["Product","Products"]}
		url={"http://127.0.0.1:5000/products/"}
		columns={['product_id', 'category_id', 'name', 'price']}
		column_names={['Product Id', 'Category Id', 'Name', 'Price']}
		pk={"product_id"}
		/>
}

export function Order() {
	return <MyTable 
		table_name={["Order","Orders"]}
		url={"http://127.0.0.1:5000/orders/"}
		columns={['order_id', 'customer_id', 'status', 'created_at']}
		column_names={['Order Id', 'Customer Id', 'Status', 'Created At']}
		pk={"order_id"}
		/>
}

export function OrderItem() {
	return <MyTable 
		table_name={["OrderItem","Order_items"]}
		url={"http://127.0.0.1:5000/order_items/"}
		columns={['order_item_id', 'order_id', 'product_id', 'quantity']}
		column_names={['Order Item Id', 'Order Id', 'Product Id', 'Quantity']}
		pk={"order_item_id"}
		/>
}

export function Payment() {
	return <MyTable 
		table_name={["Payment","Payments"]}
		url={"http://127.0.0.1:5000/payments/"}
		columns={['payment_id', 'order_id', 'amount', 'method']}
		column_names={['Payment Id', 'Order Id', 'Amount', 'Method']}
		pk={"payment_id"}
		/>
}

export function Shipment() {
	return <MyTable 
		table_name={["Shipment","Shipments"]}
		url={"http://127.0.0.1:5000/shipments/"}
		columns={['shipment_id', 'order_id', 'tracking_number']}
		column_names={['Shipment Id', 'Order Id', 'Tracking Number']}
		pk={"shipment_id"}
		/>
}

export function Review() {
	return <MyTable 
		table_name={["Review","Reviews"]}
		url={"http://127.0.0.1:5000/reviews/"}
		columns={['review_id', 'product_id', 'rating']}
		column_names={['Review Id', 'Product Id', 'Rating']}
		pk={"review_id"}
		/>
}

export function Supplier() {
	return <MyTable 
		table_name={["Supplier","Suppliers"]}
		url={"http://127.0.0.1:5000/suppliers/"}
		columns={['supplier_id', 'name']}
		column_names={['Supplier Id', 'Name']}
		pk={"supplier_id"}
		/>
}

export function ProductSupplier() {
	return <MyTable 
		table_name={["ProductSupplier","Product_suppliers"]}
		url={"http://127.0.0.1:5000/product_suppliers/"}
		columns={['product_supplier_id', 'product_id', 'supplier_id']}
		column_names={['Product Supplier Id', 'Product Id', 'Supplier Id']}
		pk={"product_supplier_id"}
		/>
}

export function Cart() {
	return <MyTable 
		table_name={["Cart","Carts"]}
		url={"http://127.0.0.1:5000/carts/"}
		columns={['cart_id', 'customer_id']}
		column_names={['Cart Id', 'Customer Id']}
		pk={"cart_id"}
		/>
}

export function CartItem() {
	return <MyTable 
		table_name={["CartItem","Cart_items"]}
		url={"http://127.0.0.1:5000/cart_items/"}
		columns={['cart_item_id', 'cart_id', 'product_id', 'quantity']}
		column_names={['Cart Item Id', 'Cart Id', 'Product Id', 'Quantity']}
		pk={"cart_item_id"}
		/>
}

export function Discount() {
	return <MyTable 
		table_name={["Discount","Discounts"]}
		url={"http://127.0.0.1:5000/discounts/"}
		columns={['discount_id', 'code']}
		column_names={['Discount Id', 'Code']}
		pk={"discount_id"}
		/>
}

export function OrderDiscount() {
	return <MyTable 
		table_name={["OrderDiscount","Order_discounts"]}
		url={"http://127.0.0.1:5000/order_discounts/"}
		columns={['order_discount_id', 'order_id', 'discount_id']}
		column_names={['Order Discount Id', 'Order Id', 'Discount Id']}
		pk={"order_discount_id"}
		/>
}

