import { Transformer } from '@jest/transform';
interface Config {
    /**
     * multiple transforms
     * @example
     * ```js
     * ['babel-jest', 'ts-jest']
     * [
     *   ['babel-jest', { }],
     *   ['ts-jest', { }]
     * ]
     * ```
     */
    transformers: string[] | [string, Record<string, any>][];
    /**
     * custom cache key
     * if not set, I will combine all transform's cahceKey.
     */
    getCacheKey?: Transformer<Config>['getCacheKey'] | Transformer<Config>['getCacheKeyAsync'];
}
declare const _default: Transformer<Config>;
export default _default;
