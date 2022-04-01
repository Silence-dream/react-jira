import SearchPanel from "./SearchPanel.jsx";
import List from "./List.jsx";
import { useEffect, useState } from "react";
import { cleanObject } from "../../utils/index.js";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(params, 2000);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        return setList(await response.json());
      }
    });
  }, [debouncedParam]);
  // 初始化数据
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        return setUsers(await response.json());
      }
    });
  });

  return (
    <>
      <SearchPanel params={params} setParams={setParams} users={users} />
      <List users={users} list={list} />
    </>
  );
};
// 封装 custom hook 函数
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
// 减少请求频率
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
