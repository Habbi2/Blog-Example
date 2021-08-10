import { useState } from "react";
//  

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
      <div className="form">
        <form
          className="col-11"
          id="My-Form-post"
          onSubmit={(e) => {
            e.preventDefault();
            alert("You have submitted the form.");
            handlePostSubmit(input, imageAsFile);
          }}
        >
          <label className="col-8">
            <h3>Title:</h3>
            <input className="tinput"
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </label>
          <input className="col-4" type="file" onChange={handleImageAsFile} />
          <label className="col-12">
            <h5>Text:</h5>
            <textarea className="dinput"
              type="text"
              name="quantity"
              value={input.quantity}
              onChange={handleChange}
            />
          </label>
          <input value="Post" type="submit" className="pbutton"/>
          <label>
        </label>
        </form>
        {/* <UserContext.Consumer>
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
        </UserContext.Consumer> */}
      </div>
    );
  };

export default Form;