import { useState } from "react";
import { UserContext } from "./Fetch";

const Stock = ({
  handleSubmit,
  handleDelete,
  handleFirebaseUpload,
  handleFirebaseDelete,
  handlePostSubmit
}) => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [input, setInput] = useState({
    id: "",
    name: "",
    quantity: "",
    remove: "",
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
        id="My-Form-input"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(input);
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
        <input type="submit" />
      </form>
      <form
        id="My-Form-delete"
        onSubmit={(e) => {
          e.preventDefault();
          alert("You have submitted the form.");
          handleDelete(input);
        }}
      >
        <label>
          Add:
          <input
            type="text"
            name="remove"
            value={input.remove}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
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
          handlePostSubmit();
        }}
      >
        <label>Post:</label>
        <input value="Post" type="submit" />
      </form>
      <UserContext.Consumer>
        {(value) => (
          <div>
            {value[0].map((i) => (
              <li key={i[0]}>
                <p>Name: {i[1]}</p>
                <p>Quantity: {i[2]}</p>
              </li>
            ))}
            {value[1].map((k) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("You have submitted the form.");
                  handleFirebaseDelete(k);
                }}
              >
                <img src={k} alt=""></img>
                <input value="remove" type="submit"></input>
              </form>
            ))}
          </div>
        )}
      </UserContext.Consumer>
    </div>
  );
};

export default Stock;
