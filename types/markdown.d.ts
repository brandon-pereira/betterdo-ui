declare module '*.md' {
    const result: {
        // raw .md file content
        raw: string;
        // parsed html
        html: string;
        // markdown file name (basename)
        fileName: string;
    };
    export default result;
}
