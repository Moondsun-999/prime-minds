---
name: session-save
description: "Save the current session context for cross-session continuity. Use at the end of every session or when the user says 'save session', '/session-save', or 'remember this'."
---

# Session Save

Save the following at the end of every working session:

```markdown
## Session Summary — [Date]

### What We Did
- [List of completed tasks]

### Decisions Made
- [Key decisions and rationale]

### Current State
- [What's working, what's broken, what's in progress]

### Next Steps
- [ ] [Immediate next task]
- [ ] [Upcoming task]
- [ ] [Future consideration]

### Open Questions
- [Any unresolved questions]

### Files Changed
- [List of files created or modified]
```

Save this to `.claude/sessions/[YYYY-MM-DD].md`
