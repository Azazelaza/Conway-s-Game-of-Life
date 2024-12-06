type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[];

export function classNames(...args: ClassValue[]): string {
    const classes = [];

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) continue;

        if (typeof arg === 'string' || typeof arg === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames(...arg));
        } else if (typeof arg === 'object') {
            for (const key in arg) {
                if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}