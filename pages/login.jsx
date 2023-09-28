import React, {useContext} from "react";
import {fetchJSON} from "../tools/FetchJSON";
import {useLoading} from "../tools/UseLoading";

const Context = React.createContext({
  async listArticles() {
    return await fetchJSON("/api/test");
  },
});

export function Login() {
  const { listArticles } = useContext(Context);
  const { loading, error, data } = useLoading(async () => await listArticles());

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
        <div>
          <h1>Error</h1>
          <div id="error-text">{error.toString()}</div>
        </div>
    );
  }

  return (
      <div>
        <h1>Received</h1>
        {data.length > 0 ? (
            <div>
              {data.map((datas) => (
                  <div id={"cards"}>
                    {datas}
                  </div>
              ))}
            </div>
        ) : "No data"}
      </div>
  );
}
