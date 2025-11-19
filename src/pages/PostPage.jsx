import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  async function loadPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setPost(data);
  }

  async function loadComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: true });

    if (!error) setComments(data || []);
  }

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  async function handleUpvote() {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id)
      .select()
      .single();

    if (!error) setPost(data);
  }

  async function handleDelete() {
    await supabase.from("posts").delete().eq("id", id);
    navigate("/");
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: id,
        content: newComment,
      })
      .select()
      .single();

    if (!error) {
      setComments([...comments, data]);
      setNewComment("");
    }
  }

  if (!post) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="page-box">

      <div className="post-page-box">
        {/* TAG */}
        {post.tag && (
          <div className="post-tag">{post.tag}</div>
        )}

        {/* TITLE */}
        <h1 className="post-title">{post.title}</h1>
        <p className="post-full-content">{post.content}</p>


        {/* META */}
        <p className="post-meta">
          Created: {new Date(post.created_at).toLocaleString()}
        </p>

        {/* IMAGE */}
        {post.image_url && (
          <img src={post.image_url} alt="post" className="post-image-top" />
        )}

        {/* UPVOTES */}
        <p style={{ fontSize: "18px", marginBottom: "15px" }}>
          🔥 {post.upvotes} upvotes
        </p>

        {/* BUTTONS */}
        <div className="post-actions">
          <button className="upvote-btn" onClick={handleUpvote}>
            Upvote
          </button>

          <Link to={`/edit/${id}`}>
            <button className="edit-btn">Edit</button>
          </Link>

          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <div className="comments-container">
        <h2 className="comments-title">Comments</h2>

        {comments.length === 0 && (
          <p className="no-comments">No comments yet.</p>
        )}

        {comments.map((c) => (
          <div key={c.id} className="comment">
            {c.content}
          </div>
        ))}

        {/* COMMENT INPUT */}
        <div className="comment-row">
          <input
            className="comment-box"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button className="comment-submit" onClick={handleAddComment}>
            Add
          </button>
        </div>
      </div>

    </div>
  );
}
