import { NextResponse, NextRequest } from 'next/server';

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

// export default async function handler(req: NextRequest, res: NextResponse<Response>) {
//     if (req.method == "POST") {
//         const data = await req.json()
//         return res.json(data)
//     }
// }

// export const GET = async () => {
//   return NextResponse.json(sampleTask, { status: 200 });
// };

// export async function POST(req: NextRequest, res: NextResponse){
//     const data:Task  = await req.json()
//     console.log(data)
//     return res.json()
// }