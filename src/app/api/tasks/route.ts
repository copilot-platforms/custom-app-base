// import { Request, Response } from 'next';

type Task = {
    id: String,
    name: String,
    isCompleted: Boolean,
    createdDate: Date,
    completedDate: Date
}

const sampleTask: Task = {
    id: '394dsf',
    name: 'Sample Task',
    isCompleted: false,
    createdDate: new Date(),
    completedDate: new Date()
}

// export default async function handler(req: Request, res: Response) {
//     if (req.method == "POST") {
//         const data = await req.json()
//         return res.json()
//     }
// }

export const GET = async () => {
  return Response.json(sampleTask, { status: 200 });
};

export async function POST(req: Request, res: Response){
    const data = await res.json()
    console.log(data)
    return Response.json(data)
}