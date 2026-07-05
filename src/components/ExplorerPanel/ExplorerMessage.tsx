interface ExplorerMessageProps {
    title: string;
    text: string;
  }
  
  function ExplorerMessage({ title, text }: ExplorerMessageProps) {
    return (
      <div className="message">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    );
  }
  
  export default ExplorerMessage;