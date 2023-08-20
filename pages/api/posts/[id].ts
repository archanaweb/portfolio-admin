import { NextApiRequest, NextApiResponse } from 'next';
import { getPostByID, updatePost, daletePostByID, runMiddleware, cors } from '../../../utils/commonFunction';
import {postType} from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);
        const {id} = req.query;

        if(typeof id == 'string'){
            if(!isNaN(parseInt(id))){

                if(req.method === "GET"){
                    const post = await getPostByID(parseInt(id));
                    if(post.length > 0){
                        res.send(post[0]);
                    }else{
                        res.status(400).json({message : 'post not found'});
                    }
                }else if((req.method === "PATCH") || (req.method === "PUT")){
                    const {title, description, author} = req.body;
                    const PostData : postType = {title, description, author, id : parseInt(id)} 
                    const isUpdated = await updatePost(PostData);
                    if(isUpdated.changedRows){
                        const post = await getPostByID(parseInt(id));
                        res.send(post[0]);
                    }else{
                        res.status(202).json({
                            message : 'post not updated'
                        })
                    }
                }else if(req.method === "DELETE"){
                    const isDeleted = await daletePostByID(parseInt(id));
                    if(isDeleted.affectedRows){
                        res.send({message : 'post deleted successfully'});
                    }else{
                        res.send({message : 'post not deleted'});
                    }
                }else{
                    res.status(405).send({message : "method not allowed"});
                }


            }else{
                res.status(400).json({message : 'Id should be number'});
            }
        }else{
            res.status(400).json({message : 'Id should be number'});
        }


} 