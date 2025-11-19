import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [filterTag, setFilterTag] = useState("all");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark/light mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [darkMode]);

  async function loadPosts() {
    setLoading(true);

    let query = supabase
      .from("posts")
      .select("*")
      .order(sortBy, { ascending: false });

    if (search.trim() !== "") {
      query = query.ilike("title", `%${search}%`);
    }

    if (filterTag !== "all") {
      query = query.eq("tag", filterTag);
    }

    const { data, error } = await query;

    if (!error) setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, [sortBy, search, filterTag]);

  return (
    <div className="page-box">

      {/* LIGHT/DARK MODE TOGGLE */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          className="mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1 className="header-title">JDM Afterhours</h1>
      <p className="header-sub">A Midnight Community for JDM Car Lovers</p>

      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <Link to="/create" className="btn">Create New Post</Link>
      </div>

      {/* SEARCH + SORT + TAG FILTERS */}
      <div className="sort-search">
        <input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>

        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
          <option value="all">All Tags</option>
          <option value="Build">Build</option>
          <option value="Review">Review</option>
          <option value="Question">Question</option>
          <option value="For Sale">For Sale</option>
          <option value="Spotting">Spotting</option>
        </select>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {/* POST CARDS */}
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`}>
          <div className="post-card home-card">

            {/* IMAGE AT TOP */}
            {post.image_url && (
              <img
                src={post.image_url}
                alt="post"
                className="home-preview-img"
              />
            )}

            {/* TAG */}
            {post.tag && <div className="tag-badge">{post.tag}</div>}

            <h3>{post.title}</h3>
            <p className="post-preview">{post.content?.slice(0, 180)}...</p>
            <p className="meta">
              Posted: {new Date(post.created_at).toLocaleString()}
            </p>
            <p className="upvotes">🔥 {post.upvotes} upvotes</p>

          </div>
        </Link>
      ))}

    </div>
  );
}
