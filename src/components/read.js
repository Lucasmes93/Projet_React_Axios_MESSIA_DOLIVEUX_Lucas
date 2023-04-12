import axios from "axios";
import React, { useEffect, useState, } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import HeartButton from './HeartButton';


export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  
  useEffect(() => {
    axios.get(`http://localhost:3004/posts`).then((response) => {
      console.log(response.data);
      setAPIData(response.data);
    });
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
  };

  const getData = (e) => {
    axios.get(`http://localhost:3004/posts?q=${e}`).then((getData) => {
      setAPIData(getData.data);
    });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3004/posts/${id}`).then(() => {
      getData();
    });
  };


  return (
    <div align='center'>
      <input
        type="text"
        placeholder="Search"
        value={searchTxt}
        onChange={(e) => setSearchTxt(e.target.value)}
      />
      <buttonhide type="submit" onSelect={getData(searchTxt)}>
      </buttonhide>

      <Table singleLine>
        <Table.Header >
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checkbox Value</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "Checked" : "Unchecked"}
                </Table.Cell>
                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
                <Table.Cell>
                  <HeartButton> </HeartButton>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Pagination count={10} variant ="outlined" shape="rounded" color="secondary"
      />
    </div>
  );
}