export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';



interface ApiError {
  message: string;
  status?: number;


}



const handleApiError = async (response: Response): Promise<never> => {

  let errorData;

  try {
    errorData = await response.json();
  } catch {
    errorData = { message: 'Error desconocido' };
  }

  const error: ApiError = {
    message: errorData.message || `Error HTTP: ${response.status}`,
    status: response.status,
  };

  console.error('Error en la API:', error);
  throw error;
};



export const getPosts = async (): Promise<Post[]> => {


  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      return handleApiError(response);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw {
        message: 'Error de conexión. Verifique su conexión a internet.',
        status: 0
      };
    }
    throw {
      message: 'Error al obtener las publicaciones',
      status: 500
    };
  }
};


export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      return handleApiError(response);
    }

    const x = await response.json();

    console.log(x)
    return x; 
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw {
        message: 'Error de conexión. No se pudo crear la publicación.',
        status: 0
      };
    }
    throw {
      message: 'Error al crear la publicación',
      status: 500
    };
  }
};

export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {


  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });



    if (!response.ok) {
      return handleApiError(response);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw {
        message: 'Error de conexión. No se pudo actualizar la publicación.',
        status: 0
      };
    }
    throw {
      message: 'Error al actualizar la publicación',
      status: 500
    };
  }
};