/* tslint:disable */
/* eslint-disable */

/**
 * Look up domain confidence and tier.
 * Returns JSON: {"confidence": 0.85, "tier": 2}
 */
export function assess_source(url: string): string;

/**
 * Calculate prediction probability from evidence arrays.
 * `evidence_for`: JSON array of confidence floats [0.85, 0.80, ...]
 * `evidence_against`: JSON array of confidence floats
 * Returns probability as f64.
 */
export function calc_probability(evidence_for: string, evidence_against: string): number;

/**
 * Calculate probability shift when adding new evidence.
 * Returns JSON: {"probability": 0.65, "shift": 0.03}
 */
export function calc_shift(existing_for: string, existing_against: string, new_for: string, new_against: string): string;

/**
 * Check if the current locale/region is blocked.
 * Pass navigator.language or Intl locale string.
 */
export function check_locale(locale: string): string;

/**
 * Classify a news article by title.
 * Returns JSON: {"topics": ["sanctions", "economic"], "confidence": 0.85, "tier": 2}
 */
export function classify_article(title: string, domain: string): string;

/**
 * Get ISO-3 country code for World Bank API.
 */
export function country_iso3(name: string): string;

/**
 * Get Wikidata entity ID for a country.
 */
export function country_wikidata_id(name: string): string;

/**
 * Generate GDELT queries for a target country.
 * Returns JSON array of {query, topics} objects.
 */
export function generate_queries(country: string): string;

/**
 * Generate targeted search queries for a specific hypothesis.
 * Returns JSON array of query strings tailored to the assessment.
 */
export function hypothesis_queries(country: string, title: string, category: string): string;

/**
 * Check if a country code is blocked from analysis.
 */
export function is_blocked_country(country_code: string): boolean;

/**
 * Process a batch of raw GDELT articles and classify them.
 * Input: JSON array of {title, url, domain, date} objects.
 * Output: JSON array of {label, type, confidence, source, topics, relationship} objects
 * ready to be stored in engram via /store and /relate.
 */
export function process_articles(articles_json: string, target_country: string): string;

/**
 * Generate Wikidata SPARQL query for country borders.
 */
export function sparql_borders(wikidata_id: string): string;

/**
 * Generate Wikidata SPARQL query for leaders.
 */
export function sparql_leaders(wikidata_id: string): string;

/**
 * Generate Wikidata SPARQL query for organization memberships.
 */
export function sparql_memberships(wikidata_id: string): string;

/**
 * Get the relationship type (supports/weakens) for a topic-prediction pair.
 */
export function topic_relationship(topic: string, prediction_category: string): string;

/**
 * Validate a license key. Returns JSON: {"valid": true/false, "reason": "..."}
 */
export function validate_license(key: string): string;

/**
 * Get World Bank indicator codes as JSON.
 */
export function world_bank_indicators(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly assess_source: (a: number, b: number, c: number) => void;
    readonly calc_probability: (a: number, b: number, c: number, d: number) => number;
    readonly calc_shift: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
    readonly check_locale: (a: number, b: number, c: number) => void;
    readonly classify_article: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly country_iso3: (a: number, b: number, c: number) => void;
    readonly country_wikidata_id: (a: number, b: number, c: number) => void;
    readonly generate_queries: (a: number, b: number, c: number) => void;
    readonly hypothesis_queries: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly is_blocked_country: (a: number, b: number) => number;
    readonly process_articles: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly sparql_borders: (a: number, b: number, c: number) => void;
    readonly sparql_leaders: (a: number, b: number, c: number) => void;
    readonly sparql_memberships: (a: number, b: number, c: number) => void;
    readonly topic_relationship: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly validate_license: (a: number, b: number, c: number) => void;
    readonly world_bank_indicators: (a: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
