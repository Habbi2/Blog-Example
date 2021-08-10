import firebase from "firebase/app";
import axios from "axios";
import "firebase/auth";
import { createContext, useState, useEffect } from "react";
import Form from "./Form";
import { storage } from "../config";
import Auth from "../components/Auth";

export const UserContext = createContext();

export default function Fetch() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [imageAsUrl, setImageAsUrl] = useState([]);
  const [post, setPost] = useState([]);

  firebase.auth().onAuthStateChanged(function (usuario) {
    setUser(usuario);
  });

  useEffect(() => {
    if (user) {
      const baseURL =
        "https://delord-stock-default-rtdb.firebaseio.com/users/" +
        user.uid +
        "/posts/" +
        ".json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ";
      axios.get(baseURL).then((response) => {
        if (response.data !== null) {
          const keys = Object.keys(response.data);
          const values = Object.values(response.data);
          keys.map((k) =>
            setPost((i) => [...i, [k, values[0].imageAsUrl, values[0].input]])
          );
        }
      });
    }
  }, [user]);

  // const handleSubmitOnce = (input) => {
  //   console.log(input);
  //   if (user && item.length < 1) {
  //     setItem((i) => [
  //       [input.name, input.quantity, input.remove],
  //     ]);
  //     alert("You have submitted the form.");
  //   } else {
  //     alert("Can't submit more than once");
  //   }
  // };

  // const handleDelete = (input) => {
  //   const baseURL =
  //     "https://delord-stock-default-rtdb.firebaseio.com/users/" +
  //     user.uid +
  //     "/";
  //   const key = item.filter((i) => i[1] === input.remove);
  //   key.forEach((k) => {
  //     if (user) {
  //       axios
  //         .delete(
  //           `${
  //             baseURL + k[0]
  //           }.json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ`
  //         )
  //         .then(() => {
  //           setItem(item.filter((i) => i[1] !== input.remove));
  //         });
  //     }
  //   });
  // };

  // const handleFirebaseUpload = (image) => {
  //   if (image === "") {
  //     console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  //   }
  //   const uploadTask = storage.ref(`/images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapShot) => {
  //       console.log(snapShot);
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then((fireBaseUrl) => {
  //           setImageAsUrl((prevObject) => [...prevObject, [fireBaseUrl]]);
  //         });
  //     }
  //   );
  // };

  const handleFirebaseUploadOnce = (image) => {
    if (image === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage.ref(`/images/1`).put(image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child("1")
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl([fireBaseUrl]);
          });
      }
    );
  };

  const handleFirebaseDelete = (image) => {
    storage
      .refFromURL(image)
      .delete(image)
      .then(() => {
        setImageAsUrl(imageAsUrl.filter((i) => i !== image));
      });
  };

  // const handleSubmit = (input) => {
  //   console.log(input);
  //   if (user) {
  //     const baseURL =
  //       "https://delord-stock-default-rtdb.firebaseio.com/users/" +
  //       user.uid +
  //       ".json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ";
  //     axios.post(baseURL, { ...input }).then((response) => {
  //       const values = Object.values(response.data);
  //       if (response.data !== null) {
  //         setItem((i) => [
  //           ...i,
  //           [values[0], input.name, input.quantity, input.remove],
  //         ]);
  //       }
  //     });
  //   }
  // };

  const ImagePerm = (image) => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => [...prevObject, [fireBaseUrl]]);
          });
      }
    );
  };

  const handlePostSubmit = (input, image) => {
    ImagePerm(image);
    if (user) {
      const objs = { input, imageAsUrl };
      const baseURL =
        "https://delord-stock-default-rtdb.firebaseio.com/users/" +
        user.uid +
        "/posts/" +
        ".json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ";
      axios.post(baseURL, objs).then((response) => {
        if (response.data !== null) {
          const values = Object.values(response.data);
          setPost((i) => [...i, [values[0], imageAsUrl, input]]);
          setImageAsUrl([]);
        }
      });
      alert("You have submitted the post.");
    }
  };

  return (
    <div className="body">
      <Auth/>
      <UserContext.Provider value={post}>
        <Form
          handleFirebaseUpload={handleFirebaseUploadOnce}
          handleFirebaseDelete={handleFirebaseDelete}
          handlePostSubmit={handlePostSubmit}
        ></Form>
      </UserContext.Provider>
    </div>
  );
}
