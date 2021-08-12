import { UserContext } from "./Fetch";
import NavbarS from "./Navbar";

const Library = () => {
  return (
    <div>
      <NavbarS/>
      <UserContext.Consumer>
        {(value) =>
          value.map((k) => (
            <div key={k[0]}>
              <img alt="" src={k[1]}></img>
              <ul>
                <li>
                  <p>Nombre: {k[2].name}</p>
                  <p>Quantity: {k[2].quantity}</p>
                </li>
              </ul>
            </div>
          ))
        }
      </UserContext.Consumer>
    </div>
  );
};

export default Library;
