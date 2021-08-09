import firebase from "firebase/app";
import axios from "axios";
import "firebase/auth";
import { createContext, useState, useEffect } from "react";
import Stock from "./Stock";
import { storage } from "../config";

export const UserContext = createContext();

export default function Fetch() {
  const [item, setItem] = useState([]);
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [imageAsUrl, setImageAsUrl] = useState([]);
  const [post, setPost] = useState({});

  firebase.auth().onAuthStateChanged(function (usuario) {
    setUser(usuario);
  });

  useEffect(() => {
    if (user) {
      const baseURL =
        "https://delord-stock-default-rtdb.firebaseio.com/users/" +
        user.uid +
        ".json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ";
      axios.get(baseURL).then((response) => {
        if (response.data !== null) {
          const keys = Object.keys(response.data);
          const values = Object.values(response.data);
          keys.map((k) =>
            setItem((i) => [
              ...i,
              [
                k,
                values[keys.indexOf(k)].name,
                values[keys.indexOf(k)].quantity,
                values[keys.indexOf(k)].remove,
              ],
            ])
          );
        }
      });
      const fetchImages = async () => {
        const result = await storage.ref(`/images/`).listAll();
        console.log(result);
        const urlPromises = result.items.map((imageRef) =>
          imageRef.getDownloadURL()
        );

        return Promise.all(urlPromises);
      };

      const loadImages = async () => {
        const urls = await fetchImages();
        setImageAsUrl(urls);
      };
      loadImages();
    }
  }, [user]);

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

  const handleSubmitOnce = (input) => {
    console.log(input);
    if (user && item.length < 1) {
      const baseURL =
        "https://delord-stock-default-rtdb.firebaseio.com/users/" +
        user.uid +
        ".json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ";
      axios.post(baseURL, { ...input }).then((response) => {
        const values = Object.values(response.data);
        if (response.data !== null) {
          setItem((i) => [
            [values[0], input.name, input.quantity, input.remove],
          ]);
        }
      });
      alert("You have submitted the form.");
    } else {
      alert("Can't submit more than once");
    }
  };

  const handleDelete = (input) => {
    const baseURL =
      "https://delord-stock-default-rtdb.firebaseio.com/users/" +
      user.uid +
      "/";
    const key = item.filter((i) => i[1] === input.remove);
    key.forEach((k) => {
      if (user) {
        axios
          .delete(
            `${
              baseURL + k[0]
            }.json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ`
          )
          .then(() => {
            setItem(item.filter((i) => i[1] !== input.remove));
          });
      }
    });
  };

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

  const handlePostSubmit = () => {
    if (user) {
      const objs = { item, imageAsUrl }
      const baseURL =
        "https://delord-stock-default-rtdb.firebaseio.com/users/" +
        user.uid + "/posts/" +
        ".json?auth=ovbYYbYpeOoDxJaKS80qAwfsjkGtgd2D3VLgn3tQ";
      axios.post(baseURL, objs).then((response) => {
        if (response.data !== null) {
          setPost(objs)
        }
      });
      alert("You have submitted the post.");
    } else {
      alert("Can't submit more than once");
    }
  };

  console.log(post)
  return (
    <UserContext.Provider value={[item, imageAsUrl]}>
      <Stock
        handleSubmit={handleSubmitOnce}
        handleDelete={handleDelete}
        handleFirebaseUpload={handleFirebaseUploadOnce}
        handleFirebaseDelete={handleFirebaseDelete}
        handlePostSubmit={handlePostSubmit}
      ></Stock>
    </UserContext.Provider>
  );
}
