/**
 * A lightweight utility to concatenate CSS classes conditionally.
 * It filters out falsy values (like null, undefined, false, or empty strings)
 * and joins the remaining truthy string values with a single space.
 * 
 * @example
 * // Returns "btn bg-red-500"
 * cx('btn', isError && 'bg-red-500')
 * 
 * @param {...(string|undefined|null|boolean)} args - A varying number of arguments that might be class strings.
 * @returns {string} - The safely concatenated class string.
 */
export function cx(...args) {
    return args.filter(Boolean).join(' ');
}
