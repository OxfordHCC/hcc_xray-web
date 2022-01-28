import path from 'path';
import { stat } from "fs/promises";
import { build } from 'esbuild';
import { execFileSync } from 'child_process';


const rootDir = path.resolve(__dirname, "../projects");
console.debug(`Root directory: ${rootDir}`);

const targetPkg = process.argv[2];
console.log(`Project name: ${targetPkg}`);

const targetPkgDir = path.join(rootDir, targetPkg);
console.log(`Project directory: ${targetPkgDir}`);


async function runPostBuild(){
	const postBuildFile = path.join(targetPkgDir, "post-build.ts");
	try{
		await stat(postBuildFile);
		console.log("Post-build script found in target directory. Running...");
		execFileSync("npx",["ts-node", postBuildFile]);
		console.log("Post build file done.");
	}catch(err: any){
		// only print if not ENOENT (if ENOENT we just silently skip);
		if(err.code !== "ENOENT"){
			console.error("Unknown error while running post build script...", err);
		}
	}
}

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
		console.log("es-build done");

		await runPostBuild();

		console.log("build done");
		
		return 0;
	} catch (err) {
		console.error(`Error while building: ${err}`);
	}
}

doBuild();
