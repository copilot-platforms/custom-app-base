export async function POST(request: Request) {
  console.log('test-webhook', request);
  return new Response(JSON.stringify({ message: 'Hello World' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
