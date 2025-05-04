---

## HOW TO USE THIS ZIP + MAIN CONTROLLER

### 1. Upload the ZIP

Start a new ChatGPT session, drag and drop the zipped folder containing your prompts and system files, and say:

Use the `prompts/main-controller.md` file as the central router. I want to engage with the trading system.

---

### 2. PURPOSE OF `main-controller.md`

This file is your command center. It:

- Routes your requests to the correct phase: premarket, intraday, postmarket, or system
- Accepts input like transcripts, levels, or postmortem notes
- Combines prompts into multi-step workflows
- Honors all trading charter rules, blindspot filters, and system structure

---

### 3. MAIN USE CASES

#### Premarket Prep

Prompt:
Run premarket prep. Here’s the DP call transcript. Also use today’s ES and QQQ levels.

Workflow:
- Parse DP transcript via `dp-trade-analysis.md`
- Parse Mancini via `mancini-trade-analysis.md`
- Combine into a Unified Trade Plan using `unified-trade-plan-generator.md`

Output:
A full plan with Market Bias, Focus, Trade Setups, SPX Decision Tree, Execution Checklist.

---

#### Intraday Updates & Trade Validation

Prompt:
Validate this intraday trade idea: TSLA long above 180 reclaim, cashflow. SPX reclaiming 5606. Not in plan.

Workflow:
- Uses `validate-intraday-trade-idea.md`
- Confirms technical structure, checks against trade charter, identifies blindspots

Output:
GO / WAIT / NO GO verdict with supporting logic

---

#### Postmarket Debrief & Behavioral Logging

Prompt:
I want to log today’s trades and update the behavior KB. Here’s my P&L and postmortem.

Workflow:
- Run `daily-performance-debrief.md` to summarize execution
- Run `update-trading-behaviors-kb.md` to refine blindspot definitions

Output:
Two updated files:
- `/logs/YYYY/YYYY-MM-DD.md`
- `system/trading-behaviors-kb.md`

---

#### System & SOP Review

Prompt:
Show me the latest version of my Trading Charter and Trading Behaviors KB.

Workflow:
- Loads and displays:
  - `system/trading-charter.md`
  - `system/trading-behaviors-kb.md`

---

### 4. FOLDER STRUCTURE OVERVIEW

| Folder         | Purpose                                             |
|----------------|-----------------------------------------------------|
| `prompts/`     | Executable prompts by trading phase                 |
| `logs/`        | Daily trading logs and postmortem summaries         |
| `system/`      | SOPs, charter, behavior knowledge base              |
| `README.md`    | Maintains usage notes, author credit, TODO list     |

---

### 5. OPTIONAL TODOs

- Add `Friday Lotto Rules` checklist prompt
- Create `mirror-log-template.md` for IC vs self tracking
- Add `main-controller-guide.md` with full usage reference
- Optional: script to auto-generate `/logs/YYYY-MM-DD.md` daily file