import cache from "../src/types/Cache";

main(process.argv);

function main(argv: string[]) {
    const c = new cache(parseInt(process.argv[2]));
    return c;
}

