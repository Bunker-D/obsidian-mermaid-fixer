import { Notice, Plugin } from 'obsidian';
import * as fs from 'fs';

export default class TestPlugin extends Plugin {

	async onload() {
		const info: any = this.getInfo();
		const reporter = this.getReportFunction( info );
		reporter( );
		this.addRibbonIcon( 'flask-conical', 'Reprint', reporter );
	}

	getInfo(): any { // 👈 TO BE MODIFIED TO REPORT OTHER DATA
		const yaml = fs.readFileSync( 'test.yaml' );
		return yaml;
	}

	getReportFunction( info: any ): () => void {
		return () => {
			console.log( info );
			new Notice( '' + info );
		}
	}
}