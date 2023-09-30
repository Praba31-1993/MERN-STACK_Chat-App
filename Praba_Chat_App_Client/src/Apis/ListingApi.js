import axios from "axios";


// const GetCreditialkey = async () => {
//     // After generating a key, we need to pass client id as id and token and token
   
//     let id = islog === false ? DatasPostId : data_id.id;
//     // let token = islog === false ? Data.token : LoginToken;
//     // console.log("tokenXyhz", token);

//     await GetCreditial(id, JSON.stringify(LoginToken))
//       .then((res) => {
//         console.log("Credentialgetres", res);
//         localStorage.setItem("key_id", JSON.stringify(res.data.result._id));
//         setGetData(res.data);
//       })
//       .catch((errors) => {
//         console.log("CredentialGetErrors", errors);
//       });
//   };


export function SignUpApi(params) {
    return axios.post(`${process.env.REACT_APP_API_URL_API}/Signup`, params);
    // return axios.post(`http://localhost:4100/Signup`, params)
  }
  
