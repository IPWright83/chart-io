import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as s}from"./index-D-2zTmTn.js";import{M as r}from"./index-Dw1MpZ3G.js";import"./index-DpTt3J-R.js";import"./iframe-Bho3GZXG.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";function o(n){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Extensibility"}),`
`,e.jsx(t.h1,{id:"extending-charts",children:"Extending Charts"}),`
`,e.jsx(t.p,{children:"One of the key features of all the visualizations provided is the ability to extend them. There are a number of design decisions made, so that you as the developer can tweak and customize your charts easily."}),`
`,e.jsx(t.h2,{id:"extending-the-redux-store",children:"Extending the Redux Store"}),`
`,e.jsxs(t.p,{children:["Each individual chart has it's own unique ",e.jsx(t.a,{href:"https://redux.js.org/",rel:"nofollow",children:"Redux"})," store. This store is used to contain all the transient state for the visualization but is also the best way to hook into the interaction mechanisms."]}),`
`,e.jsx(t.p,{children:"The store is designed such that you can listen to state changes if you wish, but you can also inject your own reducers into the store."}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Important Note"}),": This Redux store currently doesn't follow best practise, in that it's not guaranteed to serializeable. Currently the store may contain ",e.jsx(t.code,{children:"Functions"})," and ",e.jsx(t.code,{children:"Date"})," objects, neither of which can be serialized to JSON. This means you should not try to persist the store."]}),`
`]}),`
`,e.jsx(t.h3,{id:"listening-to-state-changes",children:"Listening to state changes"}),`
`,e.jsxs(t.p,{children:["If you wish to listen to state changes within a visualization, or simply obtain the state for some reason then you'll first need access to the store. To do this you need to register for the ",e.jsx(t.code,{children:"onStoreCreated"})," callback. This will be triggered once during the initialisation of the chart."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`const onStoreCreated = (store) => {
   // The store can now be acccessed. If you need dynamic access store
   // this value using a React useState hook.
};

<Chart onStoreCreated={onStoreCreated} ...>
  ...
</Chart>
`})}),`
`,e.jsxs(t.p,{children:["From this point on you have access to all the usual functions on a Redux store, such as ",e.jsx(t.code,{children:"dispatch"})," and ",e.jsx(t.code,{children:"getState"}),"."]}),`
`,e.jsx(t.h3,{id:"registering-a-custom-reducer",children:"Registering a custom Reducer"}),`
`,e.jsxs(t.p,{children:["It is also possible to create a custom reducer that you can then hook into your own components rendered on the chart. To do this you need to provide a ",e.jsx(t.code,{children:"customReducers"})," prop into your chart. You should only initialise this once, and not change the reducers, otherwise the store will be re-generated and may lose it's current state."]}),`
`,e.jsx(t.p,{children:"The customReducers prop takes the form of a keyed object, where each key represents part of the store."}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The following reducer names are reserved: ",e.jsx(t.code,{children:"chart"}),", ",e.jsx(t.code,{children:"event"}),", ",e.jsx(t.code,{children:"telemetry"})]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`// You typically want to define these outside of a React component or memoize them
// as if the component were to re-render, the customReducers would take a new reference
// value and cause the store to be re-initialised
const customReducers = {
  tooltips: (state = {}, action) => {
    switch(action.type) {
      case "event/mouseEnter": {
        return { tooltip: true, ...state };
      }
      default: return state;
    }
  }
}
`})})]})}function x(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{x as default};
//# sourceMappingURL=Extensibility-B3nTsPSs.js.map
