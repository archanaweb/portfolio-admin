import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
  
    const { title, year_of_experience, project_completed, name, profile, designation, decription } = req.body;
    // console.log(req.body)

    const addIntroQuery = `INSERT INTO intro (title, year_of_experience, project_completed, name, profile, designation, decription) VALUES ('${title}', '${year_of_experience}', '${project_completed}', '${name}', '${profile}', '${designation}', '${decription}')`;

    const getIntroQuery = `SELECT * FROM intro`;


    // if(!title || !name){
    //   res.status(406).json({ message: 'title and name is required.' });
    //   return;
    // }

    try {
      connection.query(getIntroQuery, (error, result) => {
        if(result.length > 0){
          var getIntroDelete = ` DELETE FROM intro WHERE 1`;
          connection.query(getIntroDelete, (error, result) => {
            if (error) {
              console.error('Error inserting data:', error);
              return;
            }

            connection.query(addIntroQuery, (error) => {
              if (error) {
                console.error('Error inserting data:', error);
                return;
              }
              console.log('Data inserted successfully!');
            });
            
          });
        }
      });
        connection.query(addIntroQuery, (error) => {
          if (error) {
            console.error('Error inserting data:', error);
            return;
          }
          console.log('Data inserted successfully!');
        });


      res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error inserting data' });
    } finally {
      // connection.end();
    }
  } else if(req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const getIntroQuery = `SELECT * FROM intro`;
    try{
        connection.query("SET NAMES 'utf8mb4'");
        connection.query(getIntroQuery, (error, result) => {
          if (error) {
            console.error('Error inserting data:', error);
            return;
          }
          
          res.status(200).json({ message: 'success', data: result });
        });
   
    }catch(err){
      res.status(400).json({ error: err });
    }

  }else if(req.method === 'DELETE') {
    const { id } = req.body;
    var getIntroDelete = ` DELETE FROM intro WHERE id = ${id}`;

    try{
        connection.query(getIntroDelete, (error, result) => {
          if (error) {
            console.error('Error deleting data:', error);
            return;
          }
          res.status(200).json({ message: 'deleted' });
        });

    }catch(err){
      res.status(400).json({ error: err });
    }

  }else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
