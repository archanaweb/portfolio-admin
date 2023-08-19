import connection from '../app/db';
import {postType} from './types';


const getPostByID = async (id: number): Promise<any> => {
    const getPostQuery = `SELECT * FROM posts WHERE id = ?`;
  
    return new Promise((resolve, reject) => {
      connection.query(getPostQuery, [id], (error, result) => {
        if (error) {
          console.error('Error getting post:', error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };


  const updatePost = async (data : postType): Promise<any> => {
    let { id, title, description, author } = data;

    
    if(!id){
        return 'Id is required';
    }
    const originalData = await getPostByID(id);

    if(originalData[0]){
        if(!title){
            title = originalData[0].title;
        }
        if(!description){
            description = originalData[0].description;
        }
        if(!author){
            author = originalData[0].author;
        }
    }

    const updatePostQuery = `UPDATE posts SET title = ?, description = ?, author = ? WHERE id = ?`;
  
    return new Promise((resolve, reject) => {
      connection.query(updatePostQuery, [title, description, author, id], (error, result) => {
        if (error) {
          console.error('Error updating post:', error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  const daletePostByID = async (id: number): Promise<any> => {
    if (!id) {
      return 'Id is required';
    }
    const deletePostQuery = `DELETE FROM posts WHERE id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(deletePostQuery, [id], (error, result) => {
        if (error) {
          console.error('Error deleting post:', error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
  

  export {getPostByID, updatePost,daletePostByID};