const PostCard = ({ post }) => {
  return (
    <div className="card">
      <a className="title-container" href={`/post/${post._id}`}>
        <h1 className="title">{post.title}</h1>
      </a>
      <code className="date">{post.date}</code>
      <a className="author" href={`/user/${post.username}`}>
        <code><i>{post.username}</i></code>
      </a>
      <div className="detail">
        {post.detail.length > 100 ? (
          <>
            {post.detail.slice(0, 100)}
            <a href={`/post/${post._id}`} className="read-more">Read More</a>
          </>
        ) : (
          post.detail
        )}
      </div>
    </div>
  );
};

export default PostCard;