# @chart-io/react

@chart-io/react provides a set of reusable chart components to make data visualization easy. All the components are built using a combination of [React](https://reactjs.org/) and [D3](https://d3js.org/).

It aims to provide high-level components that require minial configuration to provide great looking charts, while also providing access to the low level components giving you the flexibility to customize them as you see fit.

> :warning: @chart-io/react is currently in pre-release. While you're welcome to give it a try some interfaces may change.

# Install

#### npm

`npm install --save @chart-io/react`

#### yarn

`yarn add @chart-io/react`

# Getting Started

The best way to get started is to take a look at some of the examples in this Storybook https://ipwright83.github.io/chart-io/?path=/docs/getting-started--docs.

Here is an example of a very basic Scatter chart

```
<XYChart data={[{ x: 10, y: 10 }, { x: 20, y: 20 }]}>
    <Scatter x="x" y="y"/>
    <YAxis fields="y" />
    <XAxis fields="x" />
</XYChart>
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/IPWright83/chart-io
```

Go to the project directory

```bash
  cd chart-io
```

Install dependencies

```bash
  npm install
```

Start the storybook server

```bash
  npm run storybook
```

## FAQ

#### Is @chart-io/react free to use?

@chart-io/react is free to use and the aim is that it will always be free in open source/non-commercial projects. There may be costs for commercial use in the future, purely to help support the development and improvement of @chart-io/react.
