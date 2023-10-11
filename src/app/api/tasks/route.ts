// import { Request, Response } from 'next';
import PushToS3Bucket from '../../../utils/s3utils'
import { v4 as uuidv4 } from 'uuid';


// let x = PushToS3Bucket

type Task = {
    id: string
    name: string
    isCompleted: boolean
    createdDate: Date
    completedDate: Date
}

const sampleTask: Task = {
    id: '394dsf',
    name: 'Sample Task',
    isCompleted: false,
    createdDate: new Date(),
    completedDate: new Date(),
}

export const GET = async () => {
    return Response.json(sampleTask, { status: 200 })
}

export async function POST(req: Request, res: Response) {
    const inputData = await req.json()
    // const task: Task = inputData
    const newId = uuidv4()
    inputData.id = newId

   const result = await PushToS3Bucket({ taskId: newId, jsonString: JSON.stringify(inputData) })
    
    // console.log(data)
    return Response.json(result)
}
