![Firebase Genkit + Promptfoo](https://github.com/yukinagae/genkitx-promptfoo/blob/main/assets/genkit-promptfoo.png?raw=true)

<h1>
   Firebase Genkit <> Promptfoo Plugin
</h1>

<h4>Promptfoo Community Plugin for Google Firebase Genkit</h4>

<div>
   <img alt="Github version" src="https://img.shields.io/github/v/release/yukinagae/genkitx-promptfoo">
   <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/genkitx-promptfoo">
   <img alt="GitHub License" src="https://img.shields.io/github/license/yukinagae/genkitx-promptfoo">
   <img alt="Static Badge" src="https://img.shields.io/badge/yes-a?label=maintained">
</div>

<div>
   <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/yukinagae/genkitx-promptfoo?color=blue">
   <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues-pr/yukinagae/genkitx-promptfoo?color=blue">
   <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/yukinagae/genkitx-promptfoo">
</div>

</br>

**`genkitx-promptfoo`** is a community plugin for using [Promptfoo](https://github.com/promptfoo/promptfoo) with [Firebase Genkit](https://github.com/firebase/genkit).
Built by [**Yuki Nagae**](https://github.com/yukinagae).

This Genkit plugin allows to use [Promptfoo](https://github.com/promptfoo/promptfoo).

> [!WARNING]
> **This version is experimental and may have API changes and critical bugs. Use it for prototypes or hobby projects, not in production**.

## Installation

Install the plugin in your project with your favorite package manager:

- `npm install genkitx-promptfoo`
- `yarn add genkitx-promptfoo`
- `pnpm add genkitx-promptfoo`

## Usage

### Configuration

```typescript
import promptfooEval from 'genkitx-promptfoo';

configureGenkit({
  plugins: [
    promptfooEval({
      metrics: [
        {
          type: 'contains',
          value: 'Hello, World!',
        },
        {
          type: 'regex',
          value: '^Hello, World!$',
        },
        {
          type: 'javascript',
          value: "output.includes('Hello, World!')",
        },
        {
          type: 'similar',
          value: 'Aloha, World!',
          threshold: 0.8,
          provider: 'vertex:embedding:text-embedding-004',
        },
        {
          type: 'llm-rubric',
          value: 'It is a friendly greeting.',
          provider: 'vertex:gemini-1.5-flash',
        },
      ],
    }),
  ],
});
```

### Basic examples

You can specify the Promptfoo metrics below:

- [contains / icontains](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#contains)

```typescript
{
  type: 'contains',
  value: 'The expected substring',
},
```

- [contains-all](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#contains-all)

```typescript
{
  type: 'contains-all',
  value: [
   'Value 1',
   'Value 2',
   'Value 3',
  ],
},
```

- [contains-any](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#contains-any)

```typescript
{
  type: 'contains-any',
  value: [
   'Value 1',
   'Value 2',
   'Value 3',
  ],
},
```

- [regex](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#regex)

```typescript
{
  type: 'regex',
  value: '\\d{4}', // Matches a 4-digit number
},
```

- [contains-json](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#contains-json) / [is-json](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#is-json)

```typescript
{
  type: 'contains-json',
  value:
  {
    'required': ['latitude', 'longitude'],
    'type': 'object',
    'properties':
      {
        'latitude': { 'type': 'number', 'minimum': -90, 'maximum': 90 },
        'longitude': { 'type': 'number', 'minimum': -180, 'maximum': 180 },
      },
  }
},
```

- [contains-sql](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#contains-sql) / [is-sql](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#is-sql)

To use this assertion, you need to install the node-sql-parser package. You can install it using npm: `npm install node-sql-parser`.

```typescript
{
  type: 'contains-sql',
},
```

- [equals](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#equality)

```typescript
{
  type: 'equals',
  value: 'The expected output',
},
```

- [contains-xml](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#contains-xml) / [is-xml](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#is-xml)

```typescript
{
  type: 'contains-xml',
},
```

- [javascript](https://www.promptfoo.dev/docs/configuration/expected-outputs/javascript/)

```typescript
{
  type: 'javascript',
  value: "output.includes('Hello, World!')",
},
```

- [starts-with](https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/#starts-with)

```typescript
{
  type: 'starts-with',
  value: 'Yes',
},
```

- [similar](https://www.promptfoo.dev/docs/configuration/expected-outputs/similar/)

```typescript
{
  type: 'similar',
  value: 'The expected output',
  threshold: 0.8,
  provider: 'vertex:embedding:text-embedding-004',
},
```

- [llm-rubric](https://www.promptfoo.dev/docs/configuration/expected-outputs/model-graded/llm-rubric/)

```typescript
{
  type: 'llm-rubric',
  value: 'Is not apologetic and provides a clear, concise answer',
  provider: 'vertex:gemini-1.5-flash',
},
```

## Contributing

Want to contribute to the project? That's awesome! Head over to our [Contribution Guidelines](https://github.com/yukinagae/genkitx-promptfoo/blob/main/CONTRIBUTING.md).

## Need support?

> [!NOTE]  
> This repository depends on Google's Firebase Genkit. For issues and questions related to Genkit, please refer to instructions available in [Genkit's repository](https://github.com/firebase/genkit).

Reach out by opening a discussion on [Github Discussions](https://github.com/yukinagae/genkitx-promptfoo/discussions).

## Credits

This plugin is proudly maintained by Yuki Nagae [**Yuki Nagae**](https://github.com/yukinagae).

I got the inspiration, structure and patterns to create this plugin from the [Genkit Community Plugins](https://github.com/TheFireCo/genkit-plugins) repository built by the [Fire Compnay](https://github.com/TheFireCo) as well as the [github plugin](https://github.com/xavidop/genkitx-github).

## License

This project is licensed under the [Apache 2.0 License](https://github.com/yukinagae/genkitx-promptfoo/blob/main/LICENSE).

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202%2E0-lightgrey.svg)](https://github.com/yukinagae/genkitx-promptfoo/blob/main/LICENSE)
