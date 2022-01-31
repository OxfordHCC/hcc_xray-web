import path from 'path';
import { build, BuildOptions } from 'esbuild';
import serverConfig from '../projects/server/project-config';
import webClientConfig from '../projects/web-client/project-config';

console.log('build init');
export type ProjectConfig = {
	buildOptions?: BuildOptions,
	postBuild?: Function
}

const projectConfigurations: {[index: string]: ProjectConfig} = {
	"server": serverConfig,
	"web-client": webClientConfig
};

const rootDir = path.resolve(__dirname, "../projects");
console.debug(`Root directory: ${rootDir}`);

const targetPkg = process.argv[2];
console.log(`Project name: ${targetPkg}`);

const project = projectConfigurations[targetPkg];


const targetPkgDir = path.join(rootDir, targetPkg);
console.log(`Project directory: ${targetPkgDir}`);

const defaultBuildOptions = {
	bundle: true,
	entryPoints: [path.join(targetPkgDir, "src", "index.ts")],
	outdir: path.join(targetPkgDir, "build"),
	platform: 'node',
	sourcemap: true
}

async function doBuild(project: ProjectConfig) {
	console.log("Building...");

	const buildOptions = Object.assign({}, defaultBuildOptions, project.buildOptions);
	
	try {
		const buildRes = await build(buildOptions);
		console.log("es-build done");

		if(project.postBuild){
			await project.postBuild();
			console.log("post-build done");
		}

		console.log("build done");
		return 0;
	} catch (err) {
		console.error(`Error while building: ${err}`);
	}
}


doBuild(project);
