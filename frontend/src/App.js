import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, UncontrolledDropdown } from 'reactstrap';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import { Home } from './components/Home.jsx';

import { tables, table_names, components } from './components/Modules.jsx';

function App() {
	return (
    <Router>
      <Navbar fixed='top' color='light'>
        <NavbarBrand href="/"><h1>Home</h1></NavbarBrand>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav caret>Tables</DropdownToggle>
              <DropdownMenu right>
                {tables.map((x,i) => (<DropdownItem key={"item"+i} href={x}>{table_names[i]}</DropdownItem>))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Home tables={tables} table_names={table_names}/>}/ >
            {tables.map((x,i) => (
              <Route key={"Route"+i} path={x} element = {<>{components[i]()}</>} />))}
        </Routes>
    </Router>
	)
}

export default App;
