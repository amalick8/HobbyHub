import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="post-card fade-in">

        {/* IMAGE */}
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post"
            className="post-thumb"
          />
        )}

        <h3>{post.title}</h3>

        <p>Created: {new Date(post.created_at).toLocaleString()}</p>
        <p>Upvotes: {post.upvotes}</p>

      </div>
    </Link>
  );
}
