
import microCors from 'micro-cors';
import { json, send } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';



const cors = microCors({
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['X-Requested-With', 'Content-Type'],
    origin: 'http://localhost:3001',
  });

  const handler = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // Parse JSON body if needed
      const body = await json(req);
  
      // Your API logic here
      const responseData = { message: 'CORS enabled for specified origin', data: body };
  
      // Send JSON response
      send(res, 200, responseData);
    } catch (error) {
      // Handle errors
      send(res, 500, { error: 'An error occurred' });
    }
  };
  
  export default cors(handler);