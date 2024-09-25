# Plugin usage examples

- [Requirements](#requirements)
- [Setup](#setup)
- [Evaluation](#evaluation)
- [Making Changes](#making-changes)

## Requirements

Before you start, make sure you have these installed:

- **Node.js** version 22 or later
- **npm**
- **Genkit**

For Genkit installation, see the [official guide](https://firebase.google.com/docs/genkit/get-started).

Check your installations by running:

```bash
$ node --version # the below version is on my environment
v22.7.0
$ npm --version # the below version is on my environment
10.8.2
$ genkit --version # the below version is on my environment
0.5.10
```

## Setup

1. Install Project Dependencies: Open your terminal, navigate to this project's folder, and run:

```bash
$ npm install
```

2. Authentication and Google Cloud project configuration. Make sure Vertex AI is enabled on your project.

Follow these steps to login and configure the project:

```bash
$ gcloud auth application-default login
$ gcloud config set core/project [your-project-id]
```

## Evaluation

To evaluate your flow, run the following command:

```bash
$ genkit eval:flow menuSuggestionFlow --input data/testInputs.json
```

To view the evaluation results, run the following command and automatically opens your default web browser to http://localhost:4000.

```bash
$ genkit start -o
```

## Making Changes

### Building the Project

After making changes, you might need to build the project to see your changes in action:

```bash
$ npm run build
```

### Formatting and Linting

To ensure your code follows the project's coding standards, run the formatting and linting tools:

```bash
$ npm run typecheck # type check without modifying files
$ npm run check     # scan without modifying files
$ npm run fix       # modify files
```

### Kill Existing Processes

Sometimes existing processes are still running, preventing you from running genkit locally because the ports are already in use. In that case, run the following command to kill the processes tied to the ports:

```bash
$ npm run kill
```
