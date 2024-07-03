import getLogger from '../src/utils/logger';
import cleanJWTBlackList from './cleanJWTBlackList';

const args = process.argv.slice(2);
const script = args[1];
const parameters = args.slice(2);

const log = getLogger('scripts.index.ts');

async function execute(scriptName: string, params: string[]): Promise<void> {
    try {
        switch (scriptName) {
            case 'cleanJWTBlackList':
                await cleanJWTBlackList(params);
                break;
            default:
                break;
        }
    } catch (error) {
        log.error('Error', error);
        process.exit(1);
    }
    log.info('Finished script');
    process.exit(0);
}

execute(script, parameters);
