export function parseCsvLine(line: string): string[] {
    const fields: string[] = [];
    let field = '';
    let quoted = false;
    for (let i = 0; i < line.length; ++i) {
        const char = line[i];
        if (char === '"') {
            if (quoted && line[i + 1] === '"') {
                field += '"';
                ++i;
            }
            else {
                quoted = !quoted;
            }
        }
        else if (char === ',' && !quoted) {
            fields.push(field);
            field = '';
        }
        else {
            field += char;
        }
    }
    fields.push(field);
    return fields;
}
