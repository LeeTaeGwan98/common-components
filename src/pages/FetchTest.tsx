import {
  testGet,
  testPost,
  testPut,
  testPatch,
  testDelete,
} from "@/api/example";
import { useQuery, useMutation } from "@tanstack/react-query";

interface TestType {
  title: string;
  body: string;
  userId: number;
}

function FetchTest() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: () => testGet(),
    staleTime: 1000000000,
    gcTime: 1000000000,
  });

  const obj = { title: "foo", body: "bar", userId: 1 };

  const PostAction = useMutation({
    mutationFn: (obj: TestType) => testPost(obj),
    onSuccess(res, obj) {
      console.log("post 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  const PutAction = useMutation({
    mutationFn: (obj: TestType) => testPut(obj),
    onSuccess(res, obj) {
      console.log("put 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  const PatchAction = useMutation({
    mutationFn: (obj: TestType) => testPatch(obj),
    onSuccess(res, obj) {
      console.log("patch 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  const DeleteAction = useMutation({
    mutationFn: () => testDelete(),
    onSuccess(res, obj) {
      console.log("delete 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await testGet();
  //     console.log(res);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <button
        onClick={() => {
          PostAction.mutate(obj);
        }}
      >
        Post
      </button>

      <br />

      <button
        onClick={() => {
          PutAction.mutate(obj);
        }}
      >
        Put
      </button>

      <br />

      <button
        onClick={() => {
          PatchAction.mutate(obj);
        }}
      >
        Patch
      </button>

      <br />

      <button
        onClick={() => {
          DeleteAction.mutate();
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default FetchTest;
