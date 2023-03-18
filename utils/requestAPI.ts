export async function requestAPI(input: string, type: string): Promise<string> {
  try {
    const body = JSON.stringify({ topic: input, type: type });
    const response = await fetch('/api/topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }
    console.debug(data);
    return data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
