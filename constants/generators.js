export const generators = {
    topic: {
        name: 'topic',
        tab: 'topic',
        placeholder: 'Enter an AWS service',
        description: 'Enter an AWS service or click the button to generate one',
        value: '',
        inputDependencies: [],
    },
    supplementalTopics: {
        name: 'supplementalTopics',
        tab: 'topic',
        placeholder: 'Enter related services to include',
        description: 'Enter related services to include or click the button to generate some',
        value: '',
        inputDependencies: ["topic"],
    },
    servicesSummary: {
        name: 'servicesSummary',
        tab: 'topic',
        placeholder: 'Enter a summary of the services above',
        description: 'Enter a summary of the services above or click the button to generate one',
        value: '',
        inputDependencies: ["topic", "supplementalTopics"],
    },
    problemStatement: {
        name: 'problemStatement',
        tab: 'background',
        placeholder: 'Enter a problem statement',
        description: 'Enter a problem statement or click the button to generate one',
        value: '',
        inputDependencies: ["topic", "supplementalTopics"],
    },
    story: {
        name: 'story',
        tab: 'background',
        placeholder: 'Enter a storyline related to the topic',
        description: 'Enter a storyline related to the topic or click the button to generate one',
        value: '',
        inputDependencies: ["problemStatement"],
    },
    scenario: {
        name: 'scenario',
        tab: 'background',
        placeholder: 'Enter a scenario topic',
        description: 'Enter a scenario topic or click the button to generate one',
        value: '',
        inputDependencies: ["problemStatement"],
    },
    learningObjectives: {
        name: 'learningObjectives',
        tab: 'lab',
        placeholder: 'Enter a challenge outline related to the topic',
        description: 'Enter a challenge outline related to the topic or click the button to generate one',
        value: '',
        inputDependencies: ["scenario"],
    },
    tasks: {
        name: 'tasks',
        tab: 'lab',
        placeholder: 'Enter a task list',
        description: 'Enter a task list or click the button to generate one',
        value: '',
        inputDependencies: ["learningObjectives"],
    },
    additionalDocumentation: {
        name: 'additionalDocumentation',
        tab: 'lab',
        placeholder: 'Additional documentation links',
        description: 'Additional documentation links or click the button to generate some',
        value: '',
        inputDependencies: ["tasks"],
    },
    cloudFormation: {
        name: 'cloudFormation',
        tab: 'technical',
        placeholder: 'Enter a CloudFormation template',
        description: 'Enter a CloudFormation template or click the button to generate one',
        value: '',
        inputDependencies: ["tasks"],
        type: 'code',
        language: "yaml",
    },
    lambdaValidator: {
        name: 'lambdaValidator',
        tab: 'technical',
        placeholder: 'Enter a Lambda validation function',
        description: 'Enter a Lambda validation function or click the button to generate one',
        value: '',
        inputDependencies: ["tasks", "cloudFormation"],
        type: 'code',
        language: "python",
    },
    iamPolicy: {
        name: 'iamPolicy',
        tab: 'technical',
        placeholder: 'Enter an IAM policy',
        description: 'Enter an IAM policy or click the button to generate one',
        value: '',
        inputDependencies: ["tasks", "cloudFormation"],
        type: 'code',
        language: "json",
    },
    problemInput: {
        name: 'problemInput',
        tab: 'example',
        placeholder: 'Enter an business problem',
        description: 'Enter an business problem or click the button to generate one',
        value: '',
        inputDependencies: [],
    },
    problemServices: {
        name: 'problemServices',
        tab: 'example',
        placeholder: 'Enter an AWS service',
        description: 'Enter an AWS service or click the button to generate one',
        value: '',
        inputDependencies: ["problemInput"],
    },
}

const initialTabList = [
    {
        tab: 'topic',
        order: 1,
        name: 'Topic'
    },
    {
        tab: 'background',
        order: 2,
        name: 'Background'
    },
    {
        tab: 'lab',
        order: 3,
        name: 'Lab'
    },
    {
        tab: 'technical',
        order: 4,
        name: 'Technical'
    },
    /*{
        tab: 'example',
        order: 5,
        name: 'Alternative'
    },*/
]

export const tabs = initialTabList.sort((a, b) => a.order - b.order);
