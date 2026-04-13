import { Card, ListGroup, ListGroupItem, NavLink } from "reactstrap";

export function Home({ tables, table_names }) {
  return <>
    <Card>
      <ListGroup>
        {table_names.map((x,i) => (
          <ListGroupItem key={"listGroupItem"+i}>
            <NavLink href={tables[i]}>{x}</NavLink>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  </>
}