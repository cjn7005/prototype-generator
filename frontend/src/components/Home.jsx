import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem, NavLink } from "reactstrap";

export function Home({ tables, table_names }) {
  Home.propTypes = {
    tables: PropTypes.array.isRequired,
    table_names: PropTypes.array.isRequired
  };
  return (
    <Card>
      <ListGroup>
        {table_names.map((x,i) => (
          <ListGroupItem key={"listGroupItem"+i}>
            <NavLink href={tables[i]}>{x}</NavLink>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  )
}