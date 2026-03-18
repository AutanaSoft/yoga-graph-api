---
name: commit-messenger
description: Generates commit messages following "Conventional Commits" and the project's commitlint rules. Use it when the user requests to "generate", "make", or "create a commit message".
---

# Commit Messenger

This skill automates the generation of Git commit messages, ensuring they follow the project's "Conventional Commits" standard.

## Mandatory Rules

- The `scope` **is mandatory**. It must describe the affected module, component, or package (e.g., `ui`, `api`, `auth`, `config`). If it's not clear, infer a concise one from the `staged` files.
- The total length of the first line (header) **must not exceed 100 characters**.
- All subsequent lines (body, footer) must also not exceed 100 characters per line.
- Follow the format: `type(scope): description`.

## Available Types

- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `build`: Changes that affect the build system or external dependencies.
- `ci`: Changes to our CI configuration files and scripts.
- `chore`: Other changes that don't modify `src` or test files.
- `revert`: Reverts a previous commit.

## Workflow

1. When the skill is triggered, run `git status` to see the modified files.
2. Run `git diff` (and `git diff --staged` if applicable) to analyze exactly what lines changed. **Never guess the content of the commit**.
3. Determine the most appropriate `type` and `scope`.
4. Write a clear and brief description in English (unless requested otherwise, per programming convention).
5. If necessary, provide a `body` or `footer` for breaking changes or detailed context.
6. The final output must be strictly the suggested commit message. Do not run `git commit` on your own unless the user explicitly instructs you to do so.
