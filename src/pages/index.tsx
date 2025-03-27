import { useState, useEffect } from 'react';
import { Button, Navbar, Card, Container, Form, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { getPosts, createPost, updatePost, Post } from '../services/api';
import {  
  BsPlusCircle, 
  BsPencil, 
  BsX, 
  BsCheck2, 
  BsArrowClockwise,
  BsExclamationTriangle,
  BsJournals
} from 'react-icons/bs';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Omit<Post, 'id'>>({ 
    title: '', 
    body: '',
    userId: 1
  });
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');

  
  useEffect(() => {
    fetchPosts();
  }, []);

  const showNotification = (message: string, variant: 'success' | 'danger') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data.slice(0, 100));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los posts';
      setError(errorMessage);
      showNotification(errorMessage, 'danger');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdPost = await createPost(newPost);
      

      const localId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      
      setPosts([{...createdPost, id: localId}, ...posts]);
      setNewPost({ title: '', body: '', userId: 1 });
      showNotification('¡Publicación creada exitosamente!', 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear el post';
      setError(errorMessage);
      showNotification(errorMessage, 'danger');
      console.error(err);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;
    
    try {
      await updatePost(editingPost.id, {
        title: editingPost.title,
        body: editingPost.body
      });
      
      


      setPosts(posts.map(post => 
        post.id === editingPost.id ? {...post, ...editingPost} : post
      ));
      



      closeModal();
      showNotification('¡Publicación actualizada exitosamente!', 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la publicación';
      setError(errorMessage);
      showNotification(errorMessage, 'danger');
      console.error(err);
    }
  };

  const openEditModal = (post: Post) => {
    setEditingPost({...post});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPost(null);
  };

  return (
    <Container className="container-fluid px-2">

      
      
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={5000} 
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastVariant === 'success' ? <BsCheck2 className="me-2" /> : <BsExclamationTriangle className="me-2" />}
              Notificación
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
  
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>
            <BsJournals className="me-2" size={45} />
            <h1 className="m-0 text-white d-inline-block">Publicaciones</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
      
      <Card className="mb-4 border-2">
        <Card.Body>
          <Form onSubmit={handleCreatePost}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                className='border-primary'
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                required
                placeholder=""
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Contenido de la publicación</Form.Label>
              <Form.Control
                as="textarea"
                className='border-primary'
                rows={3}
                value={newPost.body}
                onChange={(e) => setNewPost({...newPost, body: e.target.value})}
                required
                placeholder=""
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              <BsPlusCircle className="me-2" />
              Crear Publicación
            </Button>
          </Form>
        </Card.Body>
      </Card>
  
      {loading ? (
        <div className="text-center">
          <BsArrowClockwise className="me-2 spin" />
          Cargando...
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          <BsExclamationTriangle className="me-2" />
          {error}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-2 px-md-3">
          {posts.map((post) => (
            <div key={post.id} className="col">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                  <Button 
                    variant="outline-primary"
                    onClick={() => openEditModal(post)}
                  >
                    <BsPencil className="me-2" />
                    Editar
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
  
      {/* Modal de edición */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BsPencil className="me-2" />
            Editar publicación
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {editingPost && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    title: e.target.value
                  })}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingPost.body}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    body: e.target.value
                  })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            <BsX className="me-2" />
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdatePost}>
            <BsCheck2 className="me-2" />
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
  
      <style jsx>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}