// PreToolUse guard: keeps secrets and production out of reach.
// - blocks reading/editing .env files (except .env.example)
// - asks before commands that deploy or push to master
import { stdin } from "node:process"

let raw = ""
for await (const chunk of stdin) raw += chunk
let event = {}
try {
  event = JSON.parse(raw || "{}")
} catch {
  process.exit(0)
}
const { tool_name: tool, tool_input: input = {} } = event

const isEnvFile = (p = "") => {
  const name = p.split(/[\\/]/).pop() ?? ""
  return /^\.env(\..+)?$/.test(name) && name !== ".env.example"
}

function decide(permissionDecision, reason) {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision,
        permissionDecisionReason: reason,
      },
    }),
  )
  process.exit(0)
}

if (["Read", "Edit", "Write", "MultiEdit", "NotebookEdit"].includes(tool)) {
  if (isEnvFile(input.file_path)) {
    decide("deny", "Secrets: .env files are off limits. Use .env.example for documentation.")
  }
}

if (tool === "Bash" || tool === "PowerShell") {
  const cmd = String(input.command ?? "")

  if (/(^|[\s;&|])(cat|type|less|more|head|tail|Get-Content|gc)\b[^|;&]*\.env(?!\.example)\b/i.test(cmd)) {
    decide("deny", "Secrets: don't print .env files.")
  }

  const risky = [
    [/\bvercel\b.*--prod\b/, "deploys to production"],
    [/\bgit\s+push\b.*\b(main|master)\b/, "pushes straight to master (production deploy)"],
    [/\bgit\s+push\b.*(--force|-f\b)/, "force-pushes"],
  ]
  for (const [pattern, why] of risky) {
    if (pattern.test(cmd)) decide("ask", `This command ${why}. Confirm it is intended.`)
  }
}

process.exit(0)
