const fs = require('fs')

function useRoutes() {
  const files = fs.readdirSync(__dirname);
  console.log(files);
  files.forEach(file => {

    if (file !== "index.js") {
      const router = require(`./${file}`);
      this.use(router.routes());
      this.use(router.allowedMethods());
    }
  })

}


module.exports = {
  useRoutes
}