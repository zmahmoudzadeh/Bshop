import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import { createStore } from "./api";
import snack from "./libs/snack";
import {isPhoneValid} from './libs/utils';
import errorjson from './errorhandling';
// import RegisterStore from './registerStore';
import { useSnackbar } from 'notistack';

const RegisterStore = () => {
  // const [values, setValues] = useState({
    const { enqueueSnackbar } = useSnackbar();
    const [values, setValues] = useState({
    storeName: "",
    src: "",
    ownerName: "",
    address: "",
    code: "",
    phone: "",
  });
  const handleChange = (n, v) => {
    setValues((prev) => ({
      ...prev,
      [n]: v,
    }));
  };
  const imageInsert = (item) => {
    if (item.target.files[0]) {
      setValues({
        ...values,
        src: item.target.files[0],
      });
    }
    const tempItem = item;
    tempItem.target.value = null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", values.storeName);
    fd.append("manager", values.ownerName);
    fd.append("logo", values.src);
    fd.append("address", values.address);
    // theme is not selected!
    fd.append("online", true);
    fd.append("theme", 2);
    fd.append("shomare_sabt", values.code);
    fd.append("phone", values.phone);
    fd.append("mantaghe",values.region);
    //code bishtar az 4 ragham farz shode
    if (isPhoneValid(values.phone) && values.address.length > 6 && values.ownerName.length > 4 && values.storeName.length > 4  && values.code.length > 4 ) {
      if (localStorage.getItem("role") !== "seller") {
        var email = "";
        fetch("http://eunoia-bshop.ir:8000/users/profile", {
          method: "GET",
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
            return {};
          })
          .then((res) => {
            email = res.email;
            var fd = new FormData();
            fd.append("role", "seller");
            fd.append("email", email);
            console.log(email);
            var requestOptions = {
              method: "PUT",
              headers: {
                Authorization: "Token " + localStorage.getItem("token"),
              },
              body: fd,
            };
            fetch("http://eunoia-bshop.ir:8000/users/profile", requestOptions)
              .then(async (response) => {
                if (response.status === 200) {
                  localStorage.setItem("role", "seller");
                  createStore(fd)
                    .then((resp) => {
                      if (resp.status === 201) {
                        localStorage.removeItem("shops")
                        localStorage.removeItem("shoplists")
                        window.location.replace("/");
                      }
                    })
                    .catch((e) => {
                      const msgs = Object.values(e.response.data)
                      console.log(e.response.data);
                      // console.log(e);
                      // snack.error("?????????????? ???? ???????? ??????...");
                      msgs.forEach(i => i.forEach(j => enqueueSnackbar(errorjson[j], { 
                        variant: 'error',
                    })))
                    });
                }
              })
              .catch((error) => {
                console.log("error", error);
                snack.error("?????????????? ???? ???????? ??????...");
              });
          })
          .catch((e) => {
            const msgs = Object.values(e.response.data)
          console.log(e.response.data);
            console.log(e);
            msgs.forEach(i => i.forEach(j => enqueueSnackbar(errorjson[j], { 
              variant: 'error',
          })))
            // snack.error("?????????????? ???? ???????? ??????...");
          });
      } else {
        createStore(fd)
          .then((resp) => {
            if (resp.status === 201) {
              localStorage.removeItem("shops")
              localStorage.removeItem("shoplists")
              window.location.replace("/");
            }
          })
          .catch((e) => {
            const msgs = Object.values(e.response.data)
            console.log(e.response.data);
            // console.log(e.response.);
            // msgs.forEach(i => i.forEach(j => snack.error(errorjson[j])))
            msgs.forEach(i => i.forEach(j => enqueueSnackbar(errorjson[j], { 
              variant: 'error',
          })))
             console.log(msgs);
            // snack.error("?????????????? ???? ???????? ??????...");
          });
        }
    } else {
      // inja bayad snack biad
      // snack.error('?????????? ?????????????? ???? ???? ?????????? ???????? ????????????.')
      enqueueSnackbar("???? ???? ???????? ?????????????? ?????? ???????????? ???????? ????????????.", { 
        variant: 'error',
      });
    }
  };
  return (
    <div className="homepage">
      <form
        style={{ maxWidth: "768px", margin: "20px auto", padding: "20px" }}
        className="form-signin"
      >
        <img className="mb-4" src={logo} alt="" style={{height:"40vh",width:"40vh",objectFit:"cover"}}/>
        <h1 className="h3 mb-3 font-weight-normal">???????? ???????? ??????????????</h1>
        <label for="storeName" className="sr-only">
          ?????? ??????????????
        </label>
        <input
        data-testid="register-shop-name"
          style={{ textAlign: "right", marginBottom: "10px" }}
          type="text"
          value={values.storeName}
          onChange={(e) => handleChange("storeName", e.target.value)}
          id="storeName"
          className="form-control"
          placeholder="?????? ?????????????? ?????? ???? ???????? ????????"
          required
          autofocus
        />
        <label for="userName" className="sr-only">
          ?????? ???????? ??????????????
        </label>
        <input
        data-testid="register-shop-ownername"
          style={{ textAlign: "right", marginBottom: "10px" }}
          type="text"
          value={values.ownerName}
          onChange={(e) => handleChange("ownerName", e.target.value)}
          id="userName"
          className="form-control"
          placeholder="?????? ???????? ???? ???????? ????????"
          required
          autofocus
        />
        <label for="phone" className="sr-only">
          ?????????? ????????????
        </label>
        <input
        data-testid="register-shop-phone"
          style={{ textAlign: "right", marginBottom: "10px" }}
          type="text"
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          id="phone"
          className="form-control"
          placeholder="?????????? ???????????? ?????? ???? ???????? ????????"
          required
          autofocus
        />
        <label for="address" className="sr-only">
          ????????
        </label>
        <input
        data-testid="register-shop-address"
          style={{ textAlign: "right", marginBottom: "10px" }}
          value={values.address}
          onChange={(e) => handleChange("address", e.target.value)}
          id="address"
          className="form-control"
          placeholder="???????? ?????? ???? ???????? ????????"
          required
        />
        <label for="region" className="sr-only">
          ??????????
        </label>
        <input
        data-testid="register-shop-region"
          style={{ textAlign: "right", marginBottom: "10px" }}
          value={values.region}
          onChange={(e) => handleChange("region", e.target.value)}
          id="region"
          className="form-control"
          placeholder="?????????? ?????? ???? ???????? ????????"
          required
        />
        <label for="code" className="sr-only">
          ???? ??????????????
        </label>
        <input
        data-testid="register-shop-code"
          style={{ textAlign: "right", marginBottom: "10px" }}
          value={values.code}
          onChange={(e) => handleChange("code", e.target.value)}
          id="code"
          className="form-control"
          placeholder="???? ?????????????? ?????? ???? ???????? ????????"
          required
        />
        <div class="custom-file">
          <input
          data-testid="register-shop-image"
            type="file"
            onChange={imageInsert}
            class="custom-file-input"
            id="customInput"
            required
          />
          <label class="custom-file-label" htmlFor="customInput">
            {values.src ? "?????? ?????? ???????????? ?????? ??????" : "Choose file..."}
          </label>
        </div>
        <div className="checkbox mb-3"></div>
        <button
          onClick={handleSubmit}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          style={{backgroundColor: 'var(--primary-color)',border: "none"}}
          data-testid="register-shop-button"
        >
          ????????
        </button>
        {/* <p className="mt-5 mb-3 text-muted">
          ?????? ???????? ?????????? ?????????? ??????
          <Link to="/loginstore"> ???????? ???????? </Link>
        </p> */}
      </form>
    </div>
  );
};

export default RegisterStore;
