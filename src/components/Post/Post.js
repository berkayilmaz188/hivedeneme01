import Card from 'react-bootstrap/Card';
import { PostWithAuth } from '../../services/HttpService';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';

function Post(props) {

    const {title, text, postId} = props;
    const jwtToken = localStorage.getItem("JWTAccessKey")

    const DeletePost = () => {
      fetch("/api/post/"+ postId, {
          method: "DELETE",
          headers: {
              "Authorization": `Bearer ${jwtToken}`
          },
      })
      window.location.reload()
      
  }
    
    return(
        <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Id:{postId}</Card.Subtitle>
        <Card.Text>
          {text}
        </Card.Text>
        <Card.Link href="/"></Card.Link>
        <Button variant="outline-danger" onClick={DeletePost}>Delete</Button>
      </Card.Body>
    </Card>
    )
}

export default Post;