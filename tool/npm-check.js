const npmCheck = require('npm-check');

async function main() {
  try {
    const currentState = await npmCheck(options = {})
    const packages = currentState.get('packages')
    let unusedPackages = []
    packages.forEach(package => {
      if (package.unused === true) {
        console.log(package.moduleName)
        unusedPackages.push(package)
      }
    })
    if (unusedPackages.length === 0) {
      console.log('nothing')
    }
  } catch(e) {
    console.log(e)
  }
}

main()