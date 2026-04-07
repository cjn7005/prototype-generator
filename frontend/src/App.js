import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, UncontrolledDropdown } from 'reactstrap';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import { Home } from './components/Home.jsx';
import { Customer, Address, Category, Product, Order, OrderItem, Payment, Shipment, Review, Supplier, ProductSupplier, Cart, CartItem, Discount, OrderDiscount, } from './components/Modules';

function App() {
	const tables = ["/customers", "/addresses", "/categories", "/products", "/orders", "/order_items", "/payments", "/shipments", "/reviews", "/suppliers", "/product_suppliers", "/carts", "/cart_items", "/discounts", "/order_discounts", ];
	const table_names = ["Customer", "Address", "Category", "Product", "Order", "OrderItem", "Payment", "Shipment", "Review", "Supplier", "ProductSupplier", "Cart", "CartItem", "Discount", "OrderDiscount", ];
	const components = [Customer, Address, Category, Product, Order, OrderItem, Payment, Shipment, Review, Supplier, ProductSupplier, Cart, CartItem, Discount, OrderDiscount, ];

	return <>
		<Router>
		<Navbar fixed='top' color='light'>
			<NavbarBrand href="/"><h1>Home</h1></NavbarBrand>
				<Nav className="me-auto" navbar>
					<UncontrolledDropdown nav>
						<DropdownToggle nav caret>Tables</DropdownToggle>
						<DropdownMenu right>
							{tables.map((x,i) => (<DropdownItem href={x}>{table_names[i]}</DropdownItem>))}
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>
			</Navbar>
			<Routes>
				<Route exact path="/" element={<Home tables={tables} table_names={table_names}/>}/ >
					{tables.map((x,i) => (<Route path={x} element = {<>{components[i]()}</>} />)
)}			</Routes>
		</Router>
	</>
}

export default App;
