import { useState, useEffect } from "react";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import Modal from "../Modal/Modal";
import styles from "./PostsList.module.css";
import { URL } from "../../constants";

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIseFetching] = useState(false);

  useEffect(() => {
    setIseFetching(true);
    async function fetchPosts() {
      const response = await fetch(`${URL}/posts`);
      const resData = await response.json();
      setPosts(resData.posts);
      setIseFetching(false);
    }
    fetchPosts();
  }, []);

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
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {!isFetching && posts.length > 0 && (
        <ul className={styles.posts}>
          {posts.map((post) => (
            <Post key={Date.now()} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
