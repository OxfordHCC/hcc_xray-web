import path from 'path';
import { build } from 'esbuild';


const rootDir = path.resolve(__dirname, "../projects");
console.debug(`Root directory: ${rootDir}`);

const targetPkg = process.argv[2];
console.log(`Project name: ${targetPkg}`);

const targetPkgDir = path.join(rootDir, targetPkg);
console.log(`Project directory: ${targetPkgDir}`);


async function doBuild(){
	console.log("Building...");
	
	try {
		const buildRes = await build({
			bundle: true,
			entryPoints: [path.join(targetPkgDir, "src", "index.ts")],
			outdir: path.join(targetPkgDir, "build"),
			platform: 'node',
			sourcemap: true
		});
		console.log("Done.");
		console.log(buildRes);
		
		return 0;
	} catch (err) {
		console.error(`Error while building: ${err}`);
	}
}

doBuild();
