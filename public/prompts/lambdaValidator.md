Write a Lambda function in Python to validate that users have completed the AWS console hands-on lab based on the following tasks:
${tasks}

For reference, here is the CloudFormation template that creates the lab environment:
${cloudFormation}

It should:
- Not contain comments
- Only return the python code
- Validate that the user has completed each of the tasks
  Use the following resources as a reference:
  https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
  """
