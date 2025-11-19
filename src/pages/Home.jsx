import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PostCard from "../components/PostCard";
import SortAndSearchBar from "../components/SortAndSearchBar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchPosts() {
    let query = supabase
      .from("posts")
      .select()
      .order(orderBy, { ascending: false });

    if (searchTerm.trim() !== "") {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    const { data, error } = await query;
    if (!error) setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, [orderBy, searchTerm]);

  return (
    <div className="page-wrapper">
      <div className="home-center">

        {/* Header */}
        <h1 className="header-title">HobbyHub</h1>

        {/* Create New Post */}
        <a href="/create" className="btn create-btn">Create New Post</a>

        {/* Sort + Search */}
        <div className="sort-center">
          <SortAndSearchBar
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Posts */}
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {posts.length === 0 && (
            <p style={{ opacity: 0.7 }}>No posts yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
