
let webpackConfig = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  config.module.rules.push(
    {
      test: /\.md$/,
      use: [
      { loader: "html-loader" },
      { loader: "markdown-loader", options: { /* your options here */ } }
      ]
    }
  );
  // Solved: Module not found: Can't resolve 'fs'
  config.node.fs = 'empty';
  return config
}

module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) 
  // return {...defaultConfig, ...webpackConfig};
  defaultConfig.webpack = webpackConfig;
  return {...defaultConfig, basePath: ''};
}
