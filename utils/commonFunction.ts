import { NextApiRequest, NextApiResponse } from 'next';
import connection from './db';
import {postType} from './types';
import Cors from 'cors';

type CorsMiddleware = (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void;


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

  const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: CorsMiddleware) => {
    return new Promise<void>((resolve, reject) => {
      fn(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
  };

  // Initializing the cors middleware
const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST'],
});

  export {getPostByID, updatePost,daletePostByID, runMiddleware, cors};