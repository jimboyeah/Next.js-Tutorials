This is a starter template for [Learn Next.js](https://nextjs.org/learn).

部分内容目录：

- [👉 01 Next.js SSR 服务端渲染!](./Docs/tutorial-start.md)
- [👉 02 工程基本结构](./Docs/tutorial-basic.md)
- [👉 03 自定义页面](./Docs/tutorial-custom-page.md)
- [👉 04 路由相关组件 Link & Route](./Docs/tutorial-link-route.md)
- [👉 05 静态资源管理](./Docs/tutorial-assets.md)
- [👉 06 布局打磨](./Docs/tutorial-layout.md)
- [👉 07 样式配置建议](./Docs/tutorial-styling.md)
- [👉 08 TypeScript 配置使用](./Docs/tutorial-typescript.md)
- [👉 11 路由配置](./Docs/Advanced/route.md)
- [👉 12 页面组件渲染](./Docs/Advanced/pages.md)
- [👉 13 预渲染与数据依赖](./Docs/Advanced/prerendering.md)
- [👉 14 Markdown 文档处理](./Docs/Advanced/markdown.md)
- [👉 A1 Hello React](./Docs/React/hello.md)
- [👉 A2 基本概念](./Docs/React/mainconcepts.md)
- [👉 A3 JSX & Babel 入门](./Docs/React/babel.md)
- [👉 A4 换一种组件创建方式](./Docs/React/createClass.md)
- [👉 A5 触发更新渲染](./Docs/React/render.md)
- [👉 A6 组件与属性](./Docs/React/props.md)
- [👉 A7 组件状态与生命周期](./Docs/React/state.md)
- [👉 A8 列表、键值与协调器](./Docs/React/list-key-reconciliation.md)


另外，Next.js 提供的 Vercel 平台可以很方便地布署项目，除了支持自家的框架，还支持其它多种流行的框架。只需将代码仓库导入，即可以完成编译和部署。默认使用 main 或者 master 分支，可以在托管项目中 Production Branch 进行设置。

只是作为免费服务，就别希望性能太高了，而且还不像 github.io 限制一个仓库，还绑定用户名。

例如之前的 github.io 静态站点，重新布署在 Vercel，还有教程相关的示例：

- https://jimboyeah-github-io.vercel.app/ 
- https://next-js-tutorials.vercel.app/
  

# 命令方式创建远程代码仓库

- https://docs.github.com/rest/reference/repos#create-a-repository-for-the-authenticated-user
- https://docs.github.com/en/developers/apps/scopes-for-oauth-apps
- https://github.com/settings/tokens
- https://docs.github.com/

将本地代码 push 到 github 远程代码仓库之前，总是通过在线新建 github 代码仓库的操作是比较麻烦的。

借助 Github API，可以利用命令创建远程代码仓库，十分便捷。

首先需要申请并获取自己的 API Token，用于鉴权，OAuth scope requirements。

- `public_repo` scope or `repo` scope to create a public repository
- `repo` scope to create a private repository

通过 API Token 可以在 OAuth 应用中安全访问需要授权的 API 资源，以下可以检测什么类型的 OAuth 作用域是可用的：

	$ curl -H "Authorization: token YOUR_OAUTH-TOKEN" https://api.github.com/users/codertocat -I
	HTTP/1.1 200 OK
	X-OAuth-Scopes: repo, user
	X-Accepted-OAuth-Scopes: user

对于远程创建仓库，检查其中已经授权的 API 列表 X-OAuth-Scopes 和 X-Accepted-OAuth-Scopes 两项。

勾选 repo 支持仓库的完全控制，具体参考 Scopes for OAuth Apps：

- `repo:status` Access commit status
- `repo_deployment` Access deployment status
- `public_repo` Access public repositories
- `repo:invite` Access repository invitations
- `security_events` Read and write security events


然后在本机使用脚本简化远程创建仓库的过程，在 Windows 系统上可以使用以下脚本：

	@ECHO off
	SETLOCAL
	set user=yyyyyy
	set token=xxxxx
	set repo=%1
	GOTO :RUN

	:ERR
	    echo Error occurs %errorlevel% !
	    GOTO :END
	:RUN

	IF "%repo%" == "" (
	    echo Script [%0] need a repository name for github!
	    echo Example: %0 demo-repository
	    GOTO :END
	)
	IF "%repo%" == "user" (
	    curl -u %user%:%token% https://api.github.com/user
	    GOTO :END
	)

	IF "%repo%" == "demo" (
	    curl -H "Authorization: token %token%" https://api.github.com/repos/%user%/%repo%
	    GOTO :END
	)

	IF "%repo%" == "test" (
	    curl -H "Authorization: token %token%" https://api.github.com/users/codertocat -I
	    rem curl -v -H "Authorization: %token% TOKEN" https://api.github.com/repos/octodocs
	    GOTO :END
	)

	IF not "%repo%" == "" (
	    echo Script [%0] ready to create an new repository [%repo%] for github! 
	    curl -u '%user%:%token%' -H "Authorization: token %token%" https://api.github.com/user/repos -d "{\"name\":\"%repo%\"}"
	    rem curl -u '%user%:%token%' -H "Accept: application/vnd.github.v3+json" https://api.github.com/user/repos -d "{\"name\":\"%repo%\"}"
	    if not %errorlevel% == 0 (
	        GOTO :ERR
	    )
	    git remote add origin git@github.com:%user%/%repo%.git
	    echo Done with:
	    echo https://github.com/%user%/%repo%.git
	)
	:END

	ENDLOCAL


如 bash 的配置文件中加入下述函数定义：

	github-create() 
	{if [ $1 ]
	then
	    repo_name=$1
	else
	    repo_name=`basename $(pwd)`
	    echo "set Repo name to ${repo_name}"
	fi 
	curl -u 'username:api_token' https://api.github.com/user/repos -d '{"name":"'$repo_name'"}'
	git remote add origin git@github.com:username/$repo_name.git
	}


注意，需要使用自己的 username 与 api_token 覆盖上述函数中相应的值。

创建代码仓库只需输入命令：

	github-create repo_name

如果没有指定仓库名称 repo_name，会自动将当前路径的文件夹名称设置为代码仓库的名称。然后，就可以将本地代码仓库 push 到远程代码仓库：

	git push -u origin master

