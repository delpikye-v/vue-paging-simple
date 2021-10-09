<div>
    <h1>vue-paging-simple</h1>
    <strong>
        <a href="https://github.com/delpikye-v/vue-paging-simple">vue-paging-simple</a>
    </strong>
    <br />
    <br />
    <a href="https://codesandbox.io/s/vue-paging-simple-gt9z8">LIVE EXAMPLE</a>
</div>

---
    Version: 1.0.0

### Usage
Install the package
```js
    npm install vue-paging-simple
```

Import the module in the place you want to use:
```js
    import SimplePaging from 'vue-paging-simple'
```

Wrap you content in this component:

#### Snippet
```js
    <SimplePaging
        :totals="200"
        :limit="10"
        :section="5"
        v-model="currentPage"
    />
    // display 10 line/page,  5 page/section
```
### Props
The following props are accepted:

#### totals

Total record (Number)

#### limit
Number data in page. Default 10

#### section

Number section in display. Default 5
<div>Example: 1 2 3 4 5 > >> </div>

#### v-model
Current page

### License
MIT
