module.exports = {
  overrideWebpackConfig: ({webpackConfig, pluginOptions}) => {
    const throwError = (message, githubIssueQuery) =>
      throwUnexpectedConfigError({
        packageName: "craco-resolve-url-loader",
        githubRepo: "smimicha/craco-resolve-url-loader",
        message,
        githubIssueQuery
      });

    const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
    if (!oneOfRule) {
      throwError(
        "Can't find a 'oneOf' rule under module.rules in the webpack config!",
        "webpack+rules+oneOf"
      );
    }
    let matches = oneOfRule.oneOf.filter(rule=> {
      if(!Array.isArray(rule.use)){
        return false;
      }
      let last = rule.use[rule.use.length - 1];
      if(last.loader && (typeof last.loader === "string")) {
        return last.loader.includes("sass-loader");
      }
      return false;
    });
    if(matches.length === 0) {
      throwError(
        "Can't find your sass-loader rules under module.rules in the webpack config!",
        "webpack+rules+sass-loader"
      )
    }

    const resolveLoader = {
      loader:require.resolve('resolve-url-loader'),
      options:pluginOptions || {}
    }
    matches.forEach(match=>{
      match.use.splice(match.use.length - 1,0,resolveLoader);
    });

    //resolve-url-loader won't work unless you set sourceMap to true on the sass-loader.
    matches.forEach(match=>{
      let last = match.use[match.use.length - 1];
      last.options = last.options || {};
      last.options.sourceMap = true;
    })
    return webpackConfig;
  }
};
