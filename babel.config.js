let plugins= []

if(process.env.NODE_ENV !== "production"){
  plugins.push(["react-refresh/babel"])

}

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", 
        corejs: 3, 
        targets: "defaults", 
      }
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
  plugins
}
