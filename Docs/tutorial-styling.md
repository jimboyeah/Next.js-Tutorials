---
title: '👉 07 样式配置建议'
excerpt: '有时候需要给组件指定不止一个的样式类名，上面的列子中使用了两种方法，一是使用模板字符串将多个样式类名插入，另一个方法是使用数组的 join 方法以空格联接。'
coverImage: '/20161106s.jpg'
date: '2021-02-02T19:01:07.322Z'
author:
    name: Jeango
    picture: '/jeango.jpg'
ogImage:
    url: '/20161106s.jpg'
---

# 👉 Styling Tips 样式配置建议

- https://nextjs.org/docs/advanced-features/customizing-postcss-config


有时候需要给组件指定不止一个的样式类名，上面的列子中使用了两种方法，一是使用模板字符串将多个样式类名插入，另一个方法是使用数组的 join 方法以空格联接。

官方文档提供的是使用 classnames 模块，它可以根据条件是否成立来决定样式类是否设置，参考用法：

```jsx
import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
```

作为开箱即用的 Next.js 默认使用 PostCSS 来处理 CSS 文件。

要配置 PostCSS 可以在顶层目录中创建 postcss.config.js 配置文件，它在你使用 Tailwind CSS 这些样式库时很有用。推荐使用 postcss-preset-env 和 postcss-flexbugs-fixes 以匹配 Next.js 的默认行为，首先安装依赖：

    npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes

然后编辑 `postcss.config.js`：

```js
module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
  ]
}
```

建议清理未使用的 CSS，通过 `tailwind.config.js` 配置 purge 选项:

```js
// tailwind.config.js
module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    './pages/**/*.js',
    './components/**/*.js'
  ]
  // ...
}
```

Next.js 可以导入 SASS，两种 .scss .sass 扩展名都可以，通过样式模块支持组件级别的样式，`.module.scss` or `.module.sass`。

当然要为 Next.js 安装 Sass 依赖：

	  npm install sass


作为开箱即用的 Next.js 默认使用 PostCSS 来处理 CSS 文件。

要配置 PostCSS 可以在顶层目录中创建 postcss.config.js 配置文件，它在你使用 Tailwind CSS 这些样式库时很有用。推荐使用 postcss-preset-env 和 postcss-flexbugs-fixes 以匹配 Next.js 的默认行为，首先安装依赖：

	npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes

然后编辑 `postcss.config.js`：

```js
module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
  ]
}
```

建议清理未使用的 CSS，通过 `tailwind.config.js` 配置 purge 选项:

```js
// tailwind.config.js
module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    './pages/**/*.js',
    './components/**/*.js'
  ]
  // ...
}
```

Next.js 可以导入 SASS，两种 .scss .sass 扩展名都可以，通过样式模块支持组件级别的样式，`.module.scss` or `.module.sass`。

当然要为 Next.js 安装 Sass 依赖：

	npm install sass
