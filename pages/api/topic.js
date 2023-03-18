import { Configuration, OpenAIApi } from 'openai';
import { generateConfig } from '../../utils/generateConfig';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
            'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const config = generateConfig(req.body.type, req.body.topic);
  try {
    let completion, response
    if (config.messages) {
      completion = await openai.createChatCompletion(config);
      response = completion.data.choices[0].message.content
      const match = response.match(/```([\s\S]*?)```/);
      response = match ? match[1]: '';
    } else {
      completion = await openai.createCompletion(config);
      response = completion.data.choices[0].text
    }
    response = response.trim();
    console.log(response);
    res.status(200).json({ result: response });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      const data = await error.response.json();
      res.status(error.response.status).json(data);
    } else if (error instanceof Error) {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    } else {
      console.error(`Unexpected error with OpenAI API request: ${error}`);
      res.status(500).json({
        error: {
          message: 'An unexpected error occurred during your request.',
        },
      });
    }
  }
};
