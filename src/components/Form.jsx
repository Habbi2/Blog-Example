import { useState } from "react";
import { UserContext } from "./Fetch";

const Form = ({ handleFirebaseUpload, handlePostSubmit }) => {
    const [imageAsFile, setImageAsFile] = useState("");
    const [input, setInput] = useState({
      name: "",
      quantity: "",
    });
  
    const handleChange = (e) => {
      const value = e.target.value;
      setInput({ ...input, [e.target.name]: value });
    };
  
    const handleImageAsFile = (e) => {
      const image = e.target.files[0];
      setImageAsFile(() => image);
    };
  
    // const handlePost = (e) => {};
    return (
      <div>
        <form
          id="My-Form-image"
          onSubmit={(e) => {
            e.preventDefault();
            alert("You have submitted the image.");
            handleFirebaseUpload(imageAsFile);
          }}
        >
          <label>
            Image:
            <input type="file" onChange={handleImageAsFile} />
          </label>
          <input type="submit" />
        </form>
        <form
          id="My-Form-post"
          onSubmit={(e) => {
            e.preventDefault();
            alert("You have submitted the form.");
            handlePostSubmit(input, imageAsFile);
          }}
        >
          <label>
            Add:
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              min="0"
              name="quantity"
              value={input.quantity}
              onChange={handleChange}
            />
          </label>
          <label>Post:</label>
          <input value="Post" type="submit" />
        </form>
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

export default Form;