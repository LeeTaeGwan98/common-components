import API from "@/api/API";

export const testGet = () => {
  const data = API.get("https://jsonplaceholder.typicode.com/todos/1");
  return data;
};

export const testPost = (body: any) => {
  const data = API.post("https://jsonplaceholder.typicode.com/posts", body);
  return data;
};

export const testPut = (body: any) => {
  const data = API.put("https://jsonplaceholder.typicode.com/posts/1", body);
  return data;
};

export const testPatch = (body: any) => {
  const data = API.patch("https://jsonplaceholder.typicode.com/posts/1", body);
  return data;
};

export const testDelete = () => {
  const data = API.delete("https://jsonplaceholder.typicode.com/posts/1");
  return data;
};
