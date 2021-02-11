---
title: '👉 17 GraphQL API 查询语言'
excerpt: ''
coverImage: '/20161106s.jpg'
date: '2021-02-07T12:19:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---


## 👉 GraphQL API 查询语言
- GraphQL 核心概念 https://www.howtographql.com/basics/2-core-concepts/
- GraphQL Tutorial https://www.apollographql.com/docs/tutorial/introduction
- GraphQL Config https://graphql-config.com/introduction
- GraphQL Code Generator https://graphql-code-generator.com/docs/getting-started/index
- Apollo Server https://www.apollographql.com/docs/apollo-server/
- Apollo Client https://www.apollographql.com/docs/react/get-started/
- How Apollo Server processes GraphQL operations https://www.apollographql.com/docs/apollo-server/data/resolvers
- Apollo Server API https://www.apollographql.com/docs/apollo-server/api/apollo-server/
- GraphQL Server Playground https://github.com/graphql/graphql-playground/releases/tag/v1.8.10
- Graphql Schema Language Cheat Sheet https://github.com/sogko/graphql-schema-language-cheat-sheet
- A reference implementation of GraphQL for JavaScript https://github.com/graphql/graphql-js
- Github GraphQL API Explorer https://docs.github.com/en/graphql/overview/explorer
- GraphQL IDE Monorepo https://github.com/graphql/graphiql
- GraphiQL Live Demo https://graphql.org/swapi-graphql
- GraphQL 技术规范文档 https://github.com/graphql/graphql-spec/releases

## 👉GraphQL 基本概念

Facebook 的移动应用从 2012 年就开始使用 GraphQL。GraphQL 规范于 2015 年开源，现已经在多种环境下可用，并被各种体量的团队所使用。GraphQL SDL - Schema Definition Language 是 API 查询语言，是一个标准，被称为是一个革命性的 API 工具，可以实现比 RESTful API 更强大的数据查询 API。

与传统的 SQL - Structured Query Language 结构化查询语言直接操作数据不同，GraphQL 即图表化查询语言基于 API 查询，不与特定数据库绑定，在 API 结构设计上具有一定的抽象可视化，通过强类型数据模型系统 Schema 描述客户端与服务端的数据结构，以 API 实现查询，实现类似 RESTful API，但又比它更具优势。

Apollo Client 是一个强大的 JavaScript GraphQL 客户端，用于 React，React Native，Angular2 或者是原生 JavaScript 工作环境。对不同的前端开发环境有相应的集成包，而 React Apollo 就是 Apollo Client 在 React 环境下的集成包。

入门 Apollo Client 最简单的方法是使用 Apollo Boost，它给客户端配置推荐的设置，创建 App 内容包括缓存、本地状态管理以及错误处理。

首先安装以下的软件包：

	npm install apollo-boost react-apollo graphql-tag graphql --save

- apollo-boost 包含了搭建 Apollo 客户端需要的所有东西。
- react-apollo 集成 React 视图层
- graphql-tag 解析 GraphQL 查询必要依赖
- graphql 用于解析 GraphQL 查询

客户端可以使用 create-react-app 来创建并接入 Apollo Client。


GraphQL 可以用三个步骤来描述：

- 用 GraphQL Schema 描述你的数据类型和结构，客户端发出的查询为 Query Schema。
- 用 GraphQL Schema 查询所要的数据，在服务器端定义相应的顶层 Query 类型作为查询入口。
- 得到可预测的，和 Query Schema 一致的结果。

GraphQL Schema 可以理解为用 SDL 语言定义的一个类型集合，上面这一整个流程下来，GraphQL 会依对 Schema 依次进行：

- 对客户查询验证 `Validation`，对 Query 语句进行基本的语法解释，
- 执行客户查询 `Execution`，生成 AST 抽象语法权，根据具体情况执行查询动作。
- 填充响应数据 `Response`，按客户查询数据格式响应。

GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的工具，对 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。

GraphQL Playground 是一款专门为 GraphQL 设计的免费开源的 IDE，可以加载包含 .graphqlconfig 文件的本地存储库，也可以及连接到远程端点，提供轻松编辑代码的功能与直观的界面，比如本地已经部署好了 apollo-server-micro，打开地址即可以检测到接口的存在，输入查询时就会有相应的提示：

	http://localhost:3000/api/graphql

官方代码仓库还有一款用 React 实现的 GraphiQL IDE，可用于 CodeMirror 或者 Monaco 等在线代码编辑器中，GraphQL Language Service.



GraphQL 作为用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时，类型系统由你的数据定义。GraphQL 并没有和任何特定数据库或者存储引擎绑定，而是依靠你现有的代码和数据支撑。

一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数。

按官方站点的例子，假定一个 GraphQL 服务告诉我们当前登录用户是 me，这个用户的类型定义可能像这样：

```gql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

上面定义了 Query 根级别查询，一并的应该还有每个字段类型上的解析函数：

```gql
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

GraphQL 服务运行起来后随时接收 GraphQL 客户端查询，并开始验证和执行。接收到的查询要先进行检查，确保它只引用了已定义的类型和字段，然后运行指定的解析函数来生成结果。

例如这个查询：

```gql
{
  me {
    name
  }
}
```

就会产生只包含用户名称的 JSON 结果：

```gql
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

以上的简单示例可以解析 GraphQL 的基本特性：

- **强类型** GraphQL与 C 和 Java 等静态类型语言相似，服务端能用 SDL 定义响应什么形状和性质的数据，而 RESTful 是弱类型的，缺少机器可读的元数据；
- **分工** GraphQL 让服务端定义好支持哪些 Queries，把对数据的 Query 需求下放到客户端管理，分工明确的同时保持对 API 的聚焦；
- **分层** Query Schema 本身是定义一组分层的字段，查询就像返回的数据一样，是描述数据和需求的自然方式；
- **可预测性** Query Schema 只返回客户端要求的内容，没有任何冗余不浪费流量，而且它只有一个接口地址，由此衍生了兼容特性；
- **兼容性** 需求变动带来的新增字段不影响老客户端，服务端再也不需要版本号了，极大简化了兼容问题；传统的 App 升级会伴随 API 升级，这意味着有大量 API 服务端地址维护。而在 Fackbook 通过 GraphQL API 曾支持了横跨 3 年的移动端。
- **自检性** GraphQL 能在执行 Query 之前，即在开发时提供描述性错误消息。在给定查询的情况下，工具可以确保其句法是正确有效的，这使得构建高质量的客户端变得更加容易；
- **Doc & Mock** GraphQL 的文档永远和代码同步，开发无需维护散落多处的文档，调用者也无需担心过期问题，而且基于类型系统的强力支撑和 graphql-tools，mocking 会变得无比容易。

数据和实体背后的本质也是关系图，服务端用对象和关系的形式处理，只不过在数据库用扁平的表格存储它们，还可以通过 GraphQL 把到对外暴露的 API 也建模成一张数据关系图。

GraphQL 沉淀出来的数据模型 Schema 也可以作为一种给你的团队，后端前端客户端甚至产品及第三方沟通的共同语言，让大家对这些业务领域的规则形成共同的理解，最终达成共识。

## 👉GraphQL 查询与类型系统

GraphQL 的类型系统可以大概分三类：

- 基本类型 `List` `Scalar` `Object` `Interface` `Union` `Enum` `Input Object`
- 其中 Scalar 标量类型包括包含 `Int` `String` `Boolean` `Float` `ID`，ID 会串行化为字符串。
- 内置类型，如用于自省的内部类型 `__Schema` `__Type` `__TypeKind` `__Field` `__InputValue` `__EnumValue` `__Directive` `__DirectiveLocation`

通常 GraphQL Schema 编写类型的集合时，有三个特殊的顶级类型 `Root Type`，它们是客户端请求的入口点，对应的是三种基本操作：

```gql
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```

除了从服务器 `Query` 查询信息外，大多数应用程序还需要某种方法来更改当前存储在后端的数据。在 GraphQL 中，这些变化是通过 `Mutation` 来实现的，可以对现有数进行更新、删除，或创建新数据。应用程序的另一个重要要求是与服务器建立实时连接，以便立即了解重要事件。对于这个用例，GraphQL 提供了 `Subscription` 订阅的概念。

当客户机订阅事件时，它将启动并保持与服务器的稳定连接。每当该特定事件实际发生时，服务器就会将相应的数据推送到客户机。与遵循典型的 request-response-cycle 的查询和突变不同，订阅表示发送到客户端的数据流，语法上与 Query 或 Mutation 无异。

假如，客户端的查询请求如下：

```gql
{
  allUsers {
    name
  }
}
```

那么相应的 Query 入口点就应该定义 `allUsers` 这个 API 的根字段：

```gql
type Query {
  allUsers: [User!]!
}
```

在 GraphQL 基本功能中，还有一种称为自省 Introspection 的能力。

最基础的两个自省类型是 `__Schema` 和 `__Type`，对于两个查询方法 `__type` 和 `__schema`：

	__schema: __Schema!
	__type(name: String!): __Type

例如使用 `__type` 方法获取类型自省信息，它可以用来查询现有 Schema 数据模型中定义的类型信息，如查询字段类型名称 `__typename`。而 `__schema` 则可以获取当前类型系统完整的类型定义信息。

比如以下通过自省来查询 User 类型有什么字段：

```gql
{
  __type(name: "User") {
  	__typename
    name
    fields {
      name
      type {
        name
      }
    }
  }
}
```

示范使用 `__schema` 获取顶层的 Query 查询类型中定义的字段信息：

```gql
{
  __schema {
    queryType {
      fields {
        name type {
          kind ofType {
            kind name
          }
        }
      }
    }
  }
}
```

在 GraphQL 内部，introspectionTypes 导出了用两个下划线开头的内省系统类型：

- `__Schema` 代码整个数据模型。
- `__Type` 是内省系统的核心类型，代表系统中的标量，接口，对象类型，联合，枚举等各种基础类型信息的类型，就是提供类型信息。
- `__TypeKind` 枚举类型，指示 GraphQL 基础类型，`SCALAR` `OBJECT` `INTERFACE` `UNION` `ENUM` `INPUT_OBJECT` `LIST` `NON_NULL`。
- `__Field` 类型表示对象或接口类型中的每个字段。
- `__InputValue` 类型表示字段和指令参数以及输入对象的字段 `inputFields`。
- `__EnumValue` 返回枚举值。
- `__Directive` 类型表示服务器支持的指令。
- `__DirectiveLocation` 枚举类型，指示放置指令的位置。

参考文档给出的各自省类型的定义，可以看到 `__Type` `__Field` 两种类型的差别，字段定义“本身”就是一种类型，这个本身指的是字段的字符串表达的这部分，即字段名称。同时，字段所关联的值也有自己的类型，`__Field` 与 `_Type` 不同，类型可以有引用类型 `ofType` 和类型枚举 `kind`。而字段可以是一个方法，所有它有 `args` 这个属性，但没有 `kind` 这个类型枚举属性，因为字段本身就是字符串：

```gql
type __Schema {
  description: String
  types: [__Type!]!
  queryType: __Type!
  mutationType: __Type
  subscriptionType: __Type
  directives: [__Directive!]!
}

type __Type {
  kind: __TypeKind!
  name: String
  description: String

  # should be non-null for OBJECT and INTERFACE only, must be null for the others
  fields(includeDeprecated: Boolean = false): [__Field!]

  # should be non-null for OBJECT and INTERFACE only, must be null for the others
  interfaces: [__Type!]

  # should be non-null for INTERFACE and UNION only, always null for the others
  possibleTypes: [__Type!]

  # should be non-null for ENUM only, must be null for the others
  enumValues(includeDeprecated: Boolean = false): [__EnumValue!]

  # should be non-null for INPUT_OBJECT only, must be null for the others
  inputFields: [__InputValue!]

  # should be non-null for NON_NULL and LIST only, must be null for the others
  ofType: __Type
}

type __Field {
  name: String!
  description: String
  args: [__InputValue!]!
  type: __Type!
  isDeprecated: Boolean!
  deprecationReason: String
}

type __InputValue {
  name: String!
  description: String
  type: __Type!
  defaultValue: String
}

type __EnumValue {
  name: String!
  description: String
  isDeprecated: Boolean!
  deprecationReason: String
}

enum __TypeKind {
  SCALAR
  OBJECT
  INTERFACE
  UNION
  ENUM
  INPUT_OBJECT
  LIST
  NON_NULL
}

type __Directive {
  name: String!
  description: String
  locations: [__DirectiveLocation!]!
  args: [__InputValue!]!
  isRepeatable: Boolean!
}

enum __DirectiveLocation {
  QUERY
  MUTATION
  SUBSCRIPTION
  FIELD
  FRAGMENT_DEFINITION
  FRAGMENT_SPREAD
  INLINE_FRAGMENT
  VARIABLE_DEFINITION
  SCHEMA
  SCALAR
  OBJECT
  FIELD_DEFINITION
  ARGUMENT_DEFINITION
  INTERFACE
  UNION
  ENUM
  ENUM_VALUE
  INPUT_OBJECT
  INPUT_FIELD_DEFINITION
}
```

作为数据模型的概括类型，`__Schema` 的属性中包含所有属性信息：

- `description` 说明文字，字符串类型。
- `types` 当前服务中定义的类型列表。
- `queryType` 顶级 Query 查询操作对象。
- `mutationType` 包含顶级 Mutation 数据操作对象，如果当前服务器支持有定义的话。
- `subscriptionType` 包含顶级 Subscription 订阅操作对象，如果当前服务器支持有定义的话。
- `directives` 当前服务器支持的指令列表。

例如，以下利用 `__Schema` 简单地获取数据模型中的所有类型基本信息：
```ts
{
  __schema {
    types {
      name
      description
      kind
    }
  }
}
```

以下获取更完整的类型信息，包括查询、可变、订阅三种顶层类型 `queryType` `mutationType` `subscriptionType`，注意只在其中获取了类型名称和字段名称。另外定义了 `TypeRef` `InputValue` 两种片段类型方便辅助使用，分别用来嵌套地获取字段的引用类型信息，和查询 API 的传入参数类型信息，使用时前缀的 `...` 省略操作符号表示任意个。整个数据模型 Schema 的类型信息，包括名称、描述、字段、输入字段等信息都在 `types` 属性中返回，其中开头的文字 query IntrospectionQuery 只是作为提示性使用的，非必须，通常使用中都省略：

```ts
query IntrospectionQuery {
  __schema {
    queryType { name fields { name } }
    mutationType { name fields { name } }
    subscriptionType { name fields { name } }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args { ...InputValue  }
    type { ...TypeRef  }
    isDeprecated
    deprecationReason
  }
  inputFields { ...InputValue  }
  interfaces { ...TypeRef  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes { ...TypeRef  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind name ofType {
    kind name ofType {
      kind name ofType {
        kind name ofType {
          kind name 
        }
      }
    }
  }
}
```

## 👉执行数据查询

仅仅是遍历对象及其字段，GraphQL 就已经是一个非常有用的数据查询语言了，当你加入给字段传递参数的能力时，事情会变得更加有趣。

假设客户端的查询如下传递了查询参数：

	query {  user(id: "abc") {    id    name  }}

那么就要求服务端定义了相应的查询 API，这样就可以接收到客户传递的参数：

	type Query {  user(id: ID!): User}

来看完整的包含 Query、Mutation、Subscription 的脚本：

```gql
type Query {
  allUsers(last: Int): [User!]!
}

type Mutation {
  createUser(name: String!, age: Int!): User!
}

type Subscription {
  newUser: User!
}

type User {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: User!
}
```

有了完整的类型定义，还需要处理数据解析器，当 GraphQL 服务器接收到客户端的查询请求，通过验证执行时，就需要为查询动作填充期望的数据，这一过程交给 Resolvers 函数来处理。

前面解析了 Query 定义了顶级字段，那么每个顶级字段对应了一个 Resolver 解析函数，这里假定 users 保存了所有用户信息：

```gql
const resolvers = {
  Query: {
    user(parent, args, context, info) {
      return users.find(user => user.id === args.id);
    }
  }
}
```

每个解析函数接收了四个参数：

- **parent** 此参数指当前解析字段的上层字段，对于顶级字段为空值。字段解析是嵌套进行的，即字段指定的类型所定义的字段是可以包含其它类型的，并且任意深度进行链式解析 Resolver Chain。

- **args** 此参数对象包含从 GraphQL 客户端传来的查询参数，比如查询 `query{ user(id: "4") }` 就会给 `user()` 解析函数传入 `{ "id": "4" }`。

- **context** 所有解析函数共享的上下文对象，可以用来传递状态信息，不限于认证信息、数据库实例加载等等，参考官方文档 FETCHING DATA - Resolvers。

- **info** GraphQLResolveInfo 类型对象，包含有关操作执行状态的信息，包括字段名、从根字段到当前字段的路径等。

```ts
import { GraphQLResolveInfo } from 'graphql'
export interface GraphQLResolveInfo {
  readonly fieldName: string;
  readonly fieldNodes: ReadonlyArray<FieldNode>;
  readonly returnType: GraphQLOutputType;
  readonly parentType: GraphQLObjectType;
  readonly path: Path;
  readonly schema: GraphQLSchema;
  readonly fragments: { [key: string]: FragmentDefinitionNode };
  readonly rootValue: any;
  readonly operation: OperationDefinitionNode;
  readonly variableValues: { [variableName: string]: any };
}
```

示范如何在 ApolloServer 构造函数中设置 Context 初始值：

```ts
// Constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({
    authScope: getScope(req.headers.authorization)
  })
}));

// Example resolver
(parent, args, context, info) => {
  if(context.authScope !== ADMIN) throw new AuthenticationError('not admin');
  // Proceed
}
```


## 👉GraphQL Cheat Sheet

GraphQL 使用中的基本类型和语法要素表，感谢前人整理，我抄一遍：

```js
| GraphQL Schema Language Cheat Sheet            |                                                |                                             |
|                                                |                                                |                                             |
| # define Entity interface                      | ======== Schema ============================== | ======== Input Arguments ================== |
| interface Entity {                             | schema             GraphQL schema deffinaition | type Query {                                |
|     id: ID!                                    | query               A readonly fetch operation |   users(limit: Int): [User]                 |
|     name: string                               | mutation   A write followedd by fetch opertion | }                                           |
| }                                              | subscriptiom     A subscription operation(exp) |                                             |
|                                                |                                                | type Query {                                |
| # Define custom URL scalar                     | ======== Type Definitions ==================== |   users(limt: Int = 10): [User]             |
| scalar URL                                     | []              List               GraphQLList | }                                           |
|                                                | !           Non-null            GraphQLNonNull |                                             |
| # User type implements Entity interface        | scalar        Scalar         GraphQLScalarType | type Query {                                |
| type User implements Entity {                  | type          Object         GraphQLObjectType |   user(limit: Int, sort: String): [User]    |
|     id: ID!                                    | interface  Interface      GraphQLInterfaceType | }                                           |
|     name: String                               | union          Union          GraphQLUnionType |                                             |
|     age: Int                                   | enum            Enum           GraphQLEnumType | type Query {                                |
|     balance: Float                             | input   Input Object    GraphQLInputObjectType |   users(limit: Int = 10,                    |
|     is_active: Boolean                         |                                                |          sort: String): [User]              |
|     friends: [User]!                           |                                                | }                                           |
|     homepage: URL                              | ======== Type Modifiers ====================== |                                             |
| }                                              |  String                        Nullable String | type Query {                                |
|                                                |  String!                       Non-null String |   users(limit: Int,                         |
| # root Query type                              | [String]              List of nullable Strings |          sort: String = "asc"): [User]      |
| type Query {                                   | [String]!     Non-null list of nullable String | }                                           |
|     me: User                                   | [String!]!    Non-null list of non-null String |                                             |
|     friends(limit: Int = 10): [User]!          |                                                | type Query {                                |
| }                                              | ======== Input Types ========================= |   users(limit: Int = 10,                    |
|                                                | input ListUsersInput {                         |          sort: String = "asc"): [User]      |
| #custom complex input type                     |   limit: Int                                   | }                                           |
| input ListUsersInput {                         |   since_id: ID                                 |                                             |
|     limit: Int                                 | }                                              | ======== Interface ======================== |
|     since_id: ID                               |                                                | interface Foo {                             |
| }                                              | type Mutation {                                |   is_foo: Boolean                           |
|                                                |   users(params: ListUsersInput): [User]!       | }                                           |
| # root mutation type                           | }                                              |                                             |
| type Mutation {                                |                                                | interface Bar {                             |
|     users(params: ListUsersInput): [User]!     | ======== Custom Scalars ====================== |   is_bar: Boolean                           |
| }                                              | scalar URL                                     | }                                           |
|                                                | type User {                                    |                                             |
| # GraphQL root schema type                     |   name: String                                 | interface Goo implements Foo {              |
| schema {                                       |   homepage: URL                                |   is_foo: Boolean                           |
|     query: Query                               | }                                              |   is_goo: Boolean                           |
|     mutation: Mutation                         |                                                | }                                           |
|     subscription: ...                          | ======== Union Types ========================= |                                             |
| }                                              | type Foo {                                     | interface Boo implements Foo, Bar {         |
|                                                |   name: String                                 |   is_foo: Boolean                           |
| ======== Enums ================================| }                                              |   is_bar: Boolean                           |
| enum STATE {                                   |                                                |   is_boo: Boolean                           |
|   NOT_FOND                                     | type Bar {                                     | }                                           |
|   ACTIVE                                       |   is_bar: String                               |                                             |
|   INACTIVE                                     | }                                              | ======== Built-in Scalar Types ============ |
|   SUSPENDED                                    |                                                | Int                           Basic Integer |
| }                                              | union SingleUnion = Foo                        | Float                        Basic Floating |
|                                                | union MultipleUnion = Foo | Bar                | String                         Basic String |
| type Root {                                    | type Root {                                    | Boolean                       Basic Boolean |
|   stateForUser(userID: ID!): STATE!            |   single: SingleUnion                          | ID                     Serialized as String |
|   users(state: STATE, limit: Int = 10): [User] |   multiple: MultipleUnion                      |                                             |
| }                                              | }                                              |                                             |
```

此表基本涉及比较完整的语法要素：

- Query & Mutation 查询和变更
	- 字段 - Fields
	- 参数 - Arguments
	- 别名 - Aliases
	- 片段 - Fragments
	- 操作名称 - Operation Name
	- 变量 - Variables
	- 指令 - Directives
	- 变更 - Mutations
	- 内联片段 - Inline Fragments
- Schema 和类型
	- 类型系统 - Type System
	- 类型语言 - Type Language
	- 对象类型和字段 - Object Types and Fields
	- 参数 - Arguments
	- 查询和变更类型 - The Query and Mutation Types
	- 标量类型 - Scalar Types
	- 枚举类型 - Enumeration Types
	- 列表和非空 - Lists and Non-Null
	- 接口 - Interfaces
	- 联合类型 - Union Types
	- 输入类型 - Input Types



## 👉 API Routes with GraphQL
- https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-micro
- https://github.com/vercel/next.js/tree/canary/examples/api-routes-graphql
- SWR - stale-while-revalidate https://github.com/vercel/swr
- Basic GraphQL Microservice https://www.npmjs.com/package/apollo-server-micro

Next.js 的 API routes 可以很容易实现 REST 接口，也可以集成 GraphQL API，参考示范工程 apollo-server-micro，提供了一个简单的 GraphQL 服务的客户应用。

首先安装模块：

    npm install apollo-server-micro@2.11.0 graphql@14.6.0 swr@0.1.18

- SWR 模块是 Vercel 提供处理远程数据依赖的 React Hooks 勾子函数，旨在通过缓存提高用户体验。
- GraphQL 模块是 JavaScript 语言的实现。
- apollo-server-micro 模块是最基本的 GraphQL Microservice 微服务。

SWR 表示 stale-while-revalidate，参考 RFC5861 文档，HTTP Cache-Control Extensions for Stale Content 无状态内容缓存扩展。

SWR 基本思想是数据可以不是最新的，最会在后台更新而 UI 尽快更新，即使用了旧数据。通过缓存机制包装 Fetch API，
在请求之前先从缓存返回数据（stale），然后在异步发送请求，最后当数据返回时更新缓存并触发 UI 的重新渲染，从而提高用户体验。

导出的 React Hook 函数 `useSWR()` 接收两个参数，一个 key 通常用 URL 地址充当作为请求的唯一标志，另一个是 `fetcher` 函数即真正去获取数据的函数，通常是经过包装的 Fetch API。在 SWR 需要获取数据时，调用 `fetcher` 函数并将 `key` 这个参数传入，函数以异步返回数据。


安装好这几个依赖模块后，编写一个 GraphQL 微服务程序：

```ts
// /api/graphql.js
import { ApolloServer, gql } from 'apollo-server-micro'
import { GraphQLResolveInfo } from 'graphql'
////////////////////////////////////////////////////////////
const typeDefs = gql`
  type Query {
    sayHello: String
    users(name: String): [User!]!
  }
  type User {
    name: String
  }
`
const resolvers = {
  Query: {
    sayHello(parent, args, context, info: GraphQLResolveInfo) {
      return 'Hello World!';
    },
    users(parent, args, context, info: GraphQLResolveInfo) {
      let name = args.name ?? 'Next.js'
      return [{ name }]
    },
  },
}
////////////////////////////////////////////////////////////
export const config = {
  api: {
    bodyParser: false, // don't parse request body
  },
}
// curl localhost:3000/api/graphql?a=a -d "{""a"":1}" -H "Content-Type: binary/octet-stream"
// export default async (req:NextApiRequest, res:NextApiResponse) => {
//    res.json({query: req.query, body: req.body})
// }

// curl localhost:3000/api/graphql -d "{""query"":""{users{name}}""}" -H "Content-Type: application/json"
// curl localhost:3000/api/graphql -d "{""query"":""{users(name:\\""Walle\\""){name}}""}" -H "Content-Type: application/json"
const apolloServer = new ApolloServer({ typeDefs, resolvers })
export default apolloServer.createHandler({ path: '/api/graphql' })
```

访问 API 路由时启动 GraphQL 微服务，根据客户端查询内容返回相应的数据，这里只是用 `resolver()` 作为数据查询演示，并没有接收数据库。

其中，导出的配置参数 `bodyParser` 设置了不解析 Request Body 的数据，因此 req.body 也不会填充数据，可以提升效率。


示范使用 SWR 和 Fetch API 两种方式向 GraphQL 微服务查询数据：

```tsx
import useSWR from 'swr'
import Layout from '../../components/layout'

let fetcher = (query:any = null) => fetch(
  '/api/graphql', {
  method: "post",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ 
    query: query ?? `{
      users(name:"WALLE") {
        name
      }
      sayHello
    }`, config:{} })
  // body: JSON.stringify({query: `{users{name}}` })
})
.then(res => res.json())
//.then(txt => console.log(txt))



let GraphQL = () =>{
  let { data, error } = useSWR('{sayHello}', fetcher)

  return (
    <Layout>
    {<pre className="scroll card console">Output: {data}</pre>}
    </Layout>
  )
}

export default GraphQL;
```

注意，useSWR 是 React Hooks 函数只能在函数组件中使用，即在组件中不能用其它函数进行包装，返回值中如果没有数据表示加载中，或者出错了。

```js
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

以下示范使用 GraphQL 内置的类型定义 schema，其中 `resolve()` 函数可以返回一个值，一个或一组的 promise 异步处理对象，甚至更复杂的结构。

```js
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, } from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});
```

客户提交一个 GraphQL 查询在被验证后，GraphQL 服务器会将之执行，并返回与请求的结构相对应的结果，该结果通常会是 JSON 的格式。 这一过程 GraphQL 不能脱离类型系统处理查询，所以查询的内容必须和服务器的类型定义保持一致。

