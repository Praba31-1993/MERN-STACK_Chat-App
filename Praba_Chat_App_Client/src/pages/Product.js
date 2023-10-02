import React from "react";
import Sidebar from '../component/Sidebar';
import { useNavigate } from "react-router-dom";

function Product(props) {
  const navigate = useNavigate()
  return (
    <div>
      <Sidebar>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <button onClick={()=>navigate("/about")}>About</button>
      </Sidebar>
    </div>
  );
}

export default Product;
