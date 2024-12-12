export default function ErrorPage({ title, message, onConfirm }) {
    return (
      <div className="error">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    );
  }
  