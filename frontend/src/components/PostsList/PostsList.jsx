import Post from "../Post/Post";
import styles from "./PostsList.module.css";
import { URL } from "../../constants";
import { useLoaderData } from "react-router-dom";

function PostsList() {
  const posts = useLoaderData();

  function addPostHandler(postData) {
    fetch(`${URL}/posts`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((existingPosts) => [...existingPosts, postData]);
  }

  return (
    <>
      {posts.length > 0 && (
        <ul className={styles.posts}>
          {posts.map((post) => (
            <Post key={Date.now()} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
