import SearchPanel from "./SearchPanel.jsx";
import List from "./List.jsx";
import { useEffect, useState } from "react";
import { cleanObject } from "../../utils/index.js";
import qs from "qs";
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({
    name: "",
    personId: ""
  });
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(params))}`).then(async response => {
      if (response.ok) {
        return setList(await response.json());
      }
    });
  }, [params]);
  // 初始化数据
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        return setUsers(await response.json());
      }
    });
  }, []);

  return (
    <>
      <SearchPanel params={params} setParams={setParams} users={users}/>
      <List users={users} list={list}/>
    </>
  );
};
