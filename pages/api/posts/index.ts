import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../utils/db';
import { getPostByID, runMiddleware, cors } from '../../../utils/commonFunction';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     // Using the cors middleware
     await runMiddleware(req, res, cors);
    
    if (req.method === 'GET') {
        const getPostsQuery = `SELECT * FROM posts`;
        try{
            connection.query("SET NAMES 'utf8mb4'");
            connection.query(getPostsQuery, (error, result) => {
              if (error) {
                console.error('Error getting posts:', error);
                return;
              }
              
              res.status(200).json({ message: 'success', data: result });
            });
       
        }catch(err){
          res.status(400).json({ error: err });
        }
    }else if(req.method === 'POST'){
        const { title, description, author } = req.body;
        if(!title){
            res.status(400).json({message : 'title is required'});
            return;
        }
        if(!description){
            res.status(400).json({message : 'description is required'});
            return;
        }
        if(!author){
            res.status(400).json({message : 'author is required'});
            return;
        }
        const addPostQuery = `INSERT INTO posts (title, description, author) VALUES ('${title}', '${description}', '${author}')`;

        try {
            connection.query(addPostQuery,async (error, result) => {
                if (error) {
                      console.error('Error inserting post:', error);
                      return;
                    }
                    console.log('Post inserted successfully!');
                    var post = await getPostByID(result.insertId);
                    res.status(200).json(post[0]);
                    
                });
           
          } catch (error) {
            res.status(500).json({ message: 'Error inserting post' });
          } 
    }else {
        res.send({
            message: 'wrong method. try using get or post method'
        })
    }
}