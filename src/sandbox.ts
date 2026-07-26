/**
 * Core sandbox logic — determines whether a shell command is safe to execute.
 */

import { hasCommandSubstitution, parseCommandSegments } from './parser.js';
import { DESTRUCTIVE_PATTERNS, SAFE_PATTERNS } from './patterns.js';

/** Commands whose arguments are data, never executable command positions. */
const ARGUMENT_ONLY_SEARCH = /^\s*(?:grep|rg)\b/;

export interface SandboxOptions {
  /**
   * Extra patterns to allow beyond the built-in SAFE_PATTERNS.
   * Checked against the reconstructed command string for each segment.
   */
  extraSafe?: RegExp[];

  /**
   * Extra patterns to block beyond the built-in DESTRUCTIVE_PATTERNS.
   * Checked against the reconstructed command string for each segment.
   */
  extraDestructive?: RegExp[];

  /**
   * Custom predicate to allow specific full commands before normal checks.
   * Return `true` to allow the command, `false` to continue with normal checks.
   */
  allowCommand?: (command: string) => boolean;

  /**
   * Whether to allow stdout redirects (`>`, `>>`).
   * Default: false (blocked).
   */
  allowRedirects?: boolean;

  /**
   * Whether to allow command substitution ($(...) and backticks).
   * Default: false (blocked).
   */
  allowCommandSubstitution?: boolean;
}

/**
 * Check if a shell command is safe to execute in a sandboxed mode.
 *
 * The command is parsed into segments using shell-quote, and each segment
 * is checked independently against the destructive and safe pattern lists.
 * A command is safe only if ALL segments pass.
 *
 * For a segment to pass:
 * 1. It must NOT match an applicable destructive pattern. Built-in command names
 *    inside grep/rg search arguments are data; caller-supplied denials still apply.
 * 2. It MUST match at least one safe pattern
 * 3. It must NOT contain redirects (unless explicitly allowed)
 *
 * Additionally, command substitution ($() and backticks) is blocked by default.
 */
export function isSafeCommand(command: string, options: SandboxOptions = {}): boolean {
  const {
    extraSafe = [],
    extraDestructive = [],
    allowCommand,
    allowRedirects = false,
    allowCommandSubstitution = false,
  } = options;

  // Custom allow predicate — short-circuit for special cases
  if (allowCommand?.(command)) {
    return true;
  }

  // Block command substitution unless explicitly allowed
  if (!allowCommandSubstitution && hasCommandSubstitution(command)) {
    return false;
  }

  const allDestructive = [...DESTRUCTIVE_PATTERNS, ...extraDestructive];
  const allSafe = [...SAFE_PATTERNS, ...extraSafe];

  const segments = parseCommandSegments(command);

  // Empty command — nothing to execute
  if (segments.length === 0) {
    return false;
  }

  return segments.every((segment) => {
    if (segment.unsafeOperator !== undefined) {
      return false;
    }

    // Block redirects unless allowed
    if (!allowRedirects && segment.hasRedirect) {
      return false;
    }

    const cmd = segment.command;
    // Built-in destructive words inside a search pattern are data. Keep caller
    // supplied denials active so consumers can still forbid specific searches.
    const destructive = ARGUMENT_ONLY_SEARCH.test(cmd) ? extraDestructive : allDestructive;
    const isDestructive = destructive.some((pattern) => pattern.test(cmd));
    const isSafe = allSafe.some((pattern) => pattern.test(cmd));

    return !isDestructive && isSafe;
  });
}
