Write an IAM policy to allow users to complete the AWS console hands-on lab composed of the following tasks:
${tasks}

Ensure the policy gives users access to these specific resources to complete the tasks: ${cloudFormation}

It should:
- Not contain comments
- Only return the IAM policy document
  Use the following resources as a reference:
  https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html
  https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_policy-validator.html
  https://awspolicygen.s3.amazonaws.com/policygen.html
  """
