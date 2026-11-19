# ITMS Incident Management Comprehensive Test Plan

## Application Overview

Comprehensive Playwright test coverage plan for the Chennai ITMS incident-management application, starting from a fresh session on /incident-management.

## Test Scenarios

### 1. Incident List and Data Display

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify initial incident overview loads correctly

**File:** `tests/incident-overview.spec.ts`

**Steps:**
  1. Navigate to /incident-management.
    - expect: The INCIDENT MANAGEMENT heading and INCIDENTS tab are visible.
    - expect: The grid, toolbar, date controls, Filter & Search, and download controls are displayed.
    - expect: The loading state clears and 0-0 of 0 appears when no incidents exist.
  2. Inspect the table headers.
    - expect: Headers include S.no, Incident Id, Incident Type, Date, Source, Severity, Location, Status, and Current SOP.

#### 1.2. Verify incident date-range search

**File:** `tests/incident-date-range.spec.ts`

**Steps:**
  1. Enter valid Start Date and End Date values and click apply.
    - expect: The list reloads for the inclusive date range.
    - expect: The loading indicator appears and clears.
    - expect: The row count and pagination summary reflect results.
  2. Set End Date earlier than Start Date and submit.
    - expect: A clear validation message appears or submission is prevented.
    - expect: Invalid results are not accepted.
  3. Leave one or both date fields empty and submit.
    - expect: Required-date validation is accessible and clear.
    - expect: The page does not crash or accept an invalid range.

#### 1.3. Verify sorting across incident columns

**File:** `tests/incident-sorting.spec.ts`

**Steps:**
  1. Activate ascending and descending sorting for each sortable column.
    - expect: Sort direction is visually indicated.
    - expect: Rows are correctly ordered.
    - expect: Ordering remains stable while paging.
  2. Sort an empty grid.
    - expect: No error occurs and the empty state remains visible.

#### 1.4. Verify pagination boundaries

**File:** `tests/incident-pagination.spec.ts`

**Steps:**
  1. Navigate first, intermediate, and last pages.
    - expect: Correct records and range summary are shown.
    - expect: Previous is disabled on first page and Next is disabled on last page.
  2. Apply a filter that reduces the result set.
    - expect: Pagination resets safely to a valid page.
    - expect: No stale rows remain.

#### 1.5. Verify incident column visibility

**File:** `tests/incident-columns.spec.ts`

**Steps:**
  1. Open View Columns and hide and restore columns.
    - expect: Grid updates immediately.
    - expect: Column values remain aligned.
    - expect: Default columns restore correctly.

#### 1.6. Verify incident download

**File:** `tests/incident-download.spec.ts`

**Steps:**
  1. Download with populated, filtered, and empty results.
    - expect: Populated exports contain expected records.
    - expect: Filtered exports honor active filters or state the export scope.
    - expect: Empty exports are disabled or produce a clear no-data result.
    - expect: No corrupted download is produced.

#### 1.7. Verify Filter and Search

**File:** `tests/incident-filter.spec.ts`

**Steps:**
  1. Open filters and search using exact, partial, case, whitespace, special-character, and impossible values.
    - expect: Matching behavior is consistent.
    - expect: Whitespace and special characters are safely handled.
    - expect: Impossible values show a clear no-results state.
  2. Apply, combine, reset, and reopen filters.
    - expect: Combined filters use the documented logic.
    - expect: Reset restores defaults.
    - expect: Closing and reopening do not retain stale state unexpectedly.

#### 1.8. Verify incident detail and status transitions

**File:** `tests/incident-detail.spec.ts`

**Steps:**
  1. Open an incident row and inspect details.
    - expect: Incident identity and source data are accurate.
    - expect: Status and Current SOP are consistent.
  2. Change an authorized status or SOP; refresh; and cancel an edit.
    - expect: Validation and confirmation work.
    - expect: Success feedback appears and persisted state remains correct.
    - expect: Cancel leaves the original unchanged.

### 2. Tabs and CRUD Views

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify navigation among management tabs

**File:** `tests/management-tabs.spec.ts`

**Steps:**
  1. Switch among INCIDENTS, SOP List, and Step Types.
    - expect: Each tab shows the correct view.
    - expect: Only one tab is selected.
    - expect: Deep links and reloads restore or gracefully redirect.

#### 2.2. Verify SOP List behavior

**File:** `tests/sop-list.spec.ts`

**Steps:**
  1. Create, edit, search, and deactivate or delete a SOP according to permissions.
    - expect: Valid records are persisted and shown.
    - expect: Invalid or duplicate input is rejected.
    - expect: In-use dependencies prevent unsafe deletion.
    - expect: Cancel does not modify data.

#### 2.3. Verify Step Types behavior

**File:** `tests/step-types.spec.ts`

**Steps:**
  1. Create valid step types and submit missing, duplicate, or invalid values.
    - expect: Valid records appear.
    - expect: Required and uniqueness validation blocks invalid saves.
    - expect: Field errors are clear and associated correctly.

### 3. Header and Session Controls

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify menu and header controls

**File:** `tests/header-menu.spec.ts`

**Steps:**
  1. Open the menu and navigate every available destination.
    - expect: Authorized destinations load and selected navigation state is accurate.
    - expect: Keyboard and resized layouts remain usable.

#### 3.2. Verify language switching

**File:** `tests/localization.spec.ts`

**Steps:**
  1. Switch through all available languages and reload.
    - expect: Supported labels update and layout remains readable.
    - expect: Selection persists when configured.
    - expect: Dates remain unambiguous and consistent.

#### 3.3. Verify theme switching

**File:** `tests/theme.spec.ts`

**Steps:**
  1. Switch themes, resize, and reload.
    - expect: Theme applies consistently with readable contrast.
    - expect: Preference persists when configured.

#### 3.4. Verify SOS and notification controls

**File:** `tests/notifications.spec.ts`

**Steps:**
  1. Open notification and SOS controls and trigger count changes.
    - expect: Counts match current session data.
    - expect: Empty states are clear.
    - expect: Relevant items open the correct destination.
    - expect: Badges update and stale items disappear.

#### 3.5. Verify account and logout behavior

**File:** `tests/account-session.spec.ts`

**Steps:**
  1. Open the account menu, logout, and use browser Back.
    - expect: Identity and authorized actions are shown.
    - expect: Session ends and protected data is not exposed.
    - expect: Login or session-expired state is shown.

### 4. Network and Runtime Stability

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify loading and retry behavior

**File:** `tests/loading-states.spec.ts`

**Steps:**
  1. Throttle network and issue overlapping searches.
    - expect: Loading feedback appears and latest request wins.
    - expect: Stale responses cannot overwrite newer filters.
    - expect: No duplicate or stuck request remains.

#### 4.2. Verify API failure handling

**File:** `tests/network-errors.spec.ts`

**Steps:**
  1. Block APIs or return 500, 503, malformed data, or unauthorized responses.
    - expect: A clear error state appears.
    - expect: No infinite spinner or blank page occurs.
    - expect: Retry or session recovery works.
    - expect: Malformed fields fail safely without exposing internals.

#### 4.3. Verify console and runtime stability

**File:** `tests/runtime-stability.spec.ts`

**Steps:**
  1. Exercise primary flows while monitoring console and network.
    - expect: No uncaught exceptions or unhandled promise rejections occur.
    - expect: No unexpected API or asset failures occur.
    - expect: Rapid double-click does not duplicate actions.

### 5. Responsive and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify responsive layouts

**File:** `tests/responsive-layout.spec.ts`

**Steps:**
  1. Test desktop, tablet, portrait-mobile, landscape-mobile, and 200 percent zoom.
    - expect: No page-level horizontal overflow occurs.
    - expect: Grid scroll or reflow is usable.
    - expect: Header, tabs, dialogs, and filters remain reachable and unclipped.

#### 5.2. Verify keyboard-only operation

**File:** `tests/keyboard-accessibility.spec.ts`

**Steps:**
  1. Navigate with Tab, Shift+Tab, Enter, Space, Escape, and arrows.
    - expect: Every control has visible focus.
    - expect: Tab order is logical.
    - expect: Dialogs restore focus and can close with Escape.
    - expect: Comboboxes and date controls are keyboard-operable.

#### 5.3. Verify screen-reader semantics and automated accessibility

**File:** `tests/accessibility-audit.spec.ts`

**Steps:**
  1. Inspect roles and run an accessibility scan.
    - expect: Controls have accessible names.
    - expect: Tab, expanded, grid, dialog, and status states are correct.
    - expect: Table relationships are understandable.
    - expect: No serious or critical violations remain.

### 6. Security and Data Integrity

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify role-based authorization

**File:** `tests/authorization.spec.ts`

**Steps:**
  1. Test read-only, operator, and administrator roles and direct navigation.
    - expect: UI and APIs enforce permissions consistently.
    - expect: Unauthorized writes are rejected and clearly explained.

#### 6.2. Verify input sanitization

**File:** `tests/input-sanitization.spec.ts`

**Steps:**
  1. Enter HTML, scripts, SQL metacharacters, and oversized strings.
    - expect: Payloads are rendered or sanitized safely.
    - expect: No script executes and no database detail leaks.
    - expect: Length limits and validation are consistent.

#### 6.3. Verify concurrent updates

**File:** `tests/concurrent-updates.spec.ts`

**Steps:**
  1. Update the same incident in two sessions and rapidly submit one action twice.
    - expect: Conflict handling follows the documented rule.
    - expect: Only one authorized write or retry effect occurs.
    - expect: Status history remains consistent.

#### 6.4. Verify date, timezone, and boundary behavior

**File:** `tests/date-boundaries.spec.ts`

**Steps:**
  1. Test incidents near midnight, DST, month end, year end, and date-range boundaries.
    - expect: Inclusive filtering follows documented timezone rules.
    - expect: Displayed dates remain consistent after reload.
    - expect: No off-by-one-day result occurs.

### 7. Regression Smoke

**Seed:** `tests/seed.spec.ts`

#### 7.1. Run end-to-end critical incident flow

**File:** `tests/critical-flow.spec.ts`

**Steps:**
  1. Load the fresh overview, apply a date range, open an incident, update authorized state, and return.
    - expect: Each step succeeds.
    - expect: The overview reflects persisted state and remains in the date range.
  2. Switch tabs and refresh.
    - expect: No stale, duplicate, or unauthorized data appears.

#### 7.2. Run cross-feature regression

**File:** `tests/cross-feature-regression.spec.ts`

**Steps:**
  1. Exercise menu, language, theme, notifications, account, filters, sorting, pagination, and tabs.
    - expect: Controls remain independent.
    - expect: No state reset or console instability occurs.
    - expect: A consistent overview is restored.
