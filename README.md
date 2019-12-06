# graphql-wraptype-example

simple GraphQL-Apollo-Server example showing how https://www.npmjs.com/package/graphql-tools-fork can be implemented with the WrapType feature and transformSchema.
It works for all Types, even Scalar-Types, but it makes some problem with RootTypes like 'Query'. The Schema is generated correctly, but
the query resolves an emtpy response.

commands to reproduce the issue:
```
git clone git@github.com:devtim123/graphql-wraptype-example.git
cd graphql-wraptype-example
yarn install
yarn start
```
and visit http://localhost:4001

start query at playground:
```
{
  testing {
    books {
      title
      author
    }
  }
}

```

expected result:
```
{
  "data": {
    "testing": {
      "books": [
        {
          "title": "Harry Potter and the Chamber of Secrets",
          "author": "J.K. Rowling"
        },
        {
          "title": "Jurassic Park",
          "author": "Michael Crichton"
        }
      ]
    }
  }
}
```

current result:
```
{
  "data": {
    "testing": null
  }
}
```

Of course at this example, we could simply alter the default GraphQL-Schema manually, but the approach of WrapType helps a lot in complex szenarios,
where for example you stitch multiple endpoints and you want to wrap each endpoint in its own namespace. So to solve this issue would be really nice <3

You can change the line #65 to:
```
new WrapType('Example', 'Testing', 'testing'),
```

and the WrapType transform is working like it should. I think the reason is, that the wrapped Type is no RootType.
