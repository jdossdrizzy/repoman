@AGENTS.md

# Repository notes

## Skills

- `impeccable` (`.claude/skills/impeccable`): design/UI skill (audit, critique, polish, craft, etc.),
  vendored from [pbakaus/impeccable](https://github.com/pbakaus/impeccable). Before invoking this
  skill proactively (i.e. deciding on your own that a task matches its description), ask the user
  for confirmation first. Always fine to run it when the user explicitly invokes `/impeccable ...`
  themselves.
- `clone-website` (`.agents/skills/clone-website`, invoked via `/clone-website <url>` from
  `.claude/commands/clone-website.md`): website-cloning workflow from the
  [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template) this repo
  is built on. See `AGENTS.md` for the Next.js stack, commands and conventions.
