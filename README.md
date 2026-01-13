# @chart-it/react-d3

@chart-it/react-d3 provides a set of reusable chart components to make data visualization easy. All the components are built using a combination of [React](https://reactjs.org/) and [D3](https://d3js.org/).

It aims to provide high-level components that require minial configuration to provide great looking charts, while also providing access to the low level components giving you the flexibility to customize them as you see fit.

> :warning: @chart-it/react-d3 is currently in pre-release. While you're welcome to give it a try some interfaces may change.

# Install

#### npm

`npm install --save @chart-it/react-d3`

#### yarn

`yarn add @chart-it/react-d3`

## Run Locally

Clone the project

```bash
  git clone https://github.com/IPWright83/chart-it
```

Go to the project directory

```bash
  cd chart-it
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

#### Is @chart-it/react-d3 free to use?

@chart-it/react-d3 is free to use and the aim is that it will always be free in open source/non-commercial projects. There may be costs for commercial use in the future, purely to help support the development and improvement of @chart-it/react-d3.

#### What is the telemetry module in @chart-it/react-d3?

@chart-it/react-d3 aims to provide charts with low/zero configuration in the long run. To achieve this an understanding of which chart types fit with different data shapes is required. While currently disabled @chart-it/react-d3 will capture anonymous metadata about your charts configuration and the shape of the data (no actual data is captured).
