# Mentron FastAPI - Complete Feature Documentation

This document provides comprehensive documentation of ALL features in the Mentron FastAPI backend, including how Course Outcomes (COs) and Bloom's Taxonomy are connected to each feature.

---

## Table of Contents

1. [Authentication & User Management](#1-authentication--user-management)
2. [Faculty Services](#2-faculty-services)
3. [Student Tools](#3-student-tools)
4. [Core & Utility Features](#4-core--utility-features)
5. [Analytics System](#5-analytics-system)
6. [LMS Integration](#6-lms-integration)

---

## 1. Authentication & User Management

### 1.1 User Authentication

**Feature:** Login with JWT tokens and account security

**Purpose:** Authenticate users with email/password and issue JWT tokens

**CO Connection:** N/A (infrastructure)

**Bloom's Taxonomy:** N/A

**Key Components:**
- Password hashing with bcrypt
- Account lockout after 5 failed attempts (15 min)
- JWT token generation with user ID, role, first_login flag
- HttpOnly, Secure, SameSite=Lax cookies

**Input:** `{email, password}`
**Output:** `{access_token, token_type, user: UserInfoResponse}`

---

### 1.2 Invite-Based User Creation

**Feature:** Create users with email invitation and activation

**Purpose:** Admin-only user creation with secure activation flow

**CO Connection:** N/A

**Bloom's Taxonomy:** N/A

**Workflow:**
1. Admin creates user → generates 32-byte invite token
2. User receives email with activation link
3. User validates token and sets password
4. Account activated

**Security:**
- 48-hour token expiry
- Org Admin cannot create other Org Admins
- Username uniqueness scoped to organization

---

### 1.3 Organization Management

**Feature:** Multi-tenant organization management

**Purpose:** Create and manage organizations with custom configurations

**CO Connection:** Organizations define CO mode (required/optional/ai_generated)

**Bloom's Taxonomy:** N/A

**Organization Config:**
- `grade_scheme`: Custom grade scales (Anna University 10-point, US 4.0, etc.)
- `gpa_type`: GPA or CGPA
- `gpa_scale`: 4.0, 10.0, etc.
- `pass_threshold`: Default passing percentage
- `co_mode`: required, optional, ai_generated
- `co_range`: min_cos_per_course, max_cos_per_course

---

### 1.4 Role-Based Access Control (RBAC)

**Feature:** Role-based authorization

**Purpose:** Enforce role-based access control across the platform

**Roles:**
- **Master Admin:** System-wide access
- **Org Admin:** Organization-scoped access
- **HOD:** Department-scoped access
- **Faculty:** Course-scoped access
- **Student:** Limited access

**Usage:**
```python
@router.get("/admin-endpoint")
async def admin_endpoint(user: UserInDB = Depends(role_required(["Master Admin", "Org Admin"]))):
    ...
```

---

### 1.5 Bulk User Operations

**Feature:** Bulk user creation from CSV/Excel

**Purpose:** Import multiple users at once with invite emails

**CO Connection:** N/A

**Bloom's Taxonomy:** N/A

**Supported Formats:**
- CSV: name, email, role, department
- Excel: Name, email, Department, Role, Register No., Country

---

## 2. Faculty Services

### 2.1 Quiz Generation

**Feature:** AI-powered quiz generation from course materials

**Purpose:** Generate personalized quizzes with multiple question types

**CO Connection:**
- **Input:** `selected_cos: List[str]` - Target specific Course Outcomes
- **Question Model:** `co_ids: List[str]` - Each question maps to COs
- **Edit Support:** `POST /quizzes/{id}/update-co` - Update CO mappings post-generation
- **Validation:** Questions validated against course context (topics, COs)

**Bloom's Taxonomy:**
- **Levels:** remember, understand, apply, analyze, evaluate, create
- **Input:** `bloom_emphasis: Dict[str, float]` - Target distribution (e.g., `{"remember": 0.2, "apply": 0.3}`)
- **Question Field:** `bloom_level: BloomLevel` - Each question tagged
- **Analytics:** Performance breakdown by Bloom level

**Workflow Components:**
1. **DocumentProcessor:** Chunking and RAG indexing
2. **QuestionGenerator:** Generates questions using templates
3. **QuizAssembler:** Validates and assembles personalized quizzes

**Input:**
- `temp_content_id`: Source document
- `question_count`: Number of questions (1-200)
- `difficulty_level`: easy/medium/hard
- `bloom_emphasis`: Bloom level distribution
- `selected_cos`: Target COs

**Output:**
- Master quiz with questions
- Student-specific quiz variants
- Per-question: topic, bloom_level, co_ids, explanation

---

### 2.2 Assignment Generation

**Feature:** AI-powered assignment generation with rubrics

**Purpose:** Generate personalized assignments with deliverables and evaluation criteria

**CO Connection:**
- **Input:** `selected_cos: List[str]` - Target specific outcomes
- **Assignment Model:** `co_ids: List[str]` - Each item maps to COs
- **Edit Support:** `PUT /assignments/{id}/co` - Update CO mappings
- **Validation:** Topics validated against course context

**Bloom's Taxonomy:**
- **Input:** `cognitive_level: CognitiveLevelEnum` - Main control
- **Assignment Field:** `cognitive_level: str` - Stored per assignment
- **Action Verbs:** Uses `BLOOM_ACTION_VERBS` from shared enums

**Workflow Components:**
1. **DocumentProcessor:** Content chunking and indexing
2. **Planner:** Creates diverse assignment plan per student
3. **Generator:** Generates descriptions with deliverables
4. **ResourceGenerator:** Adds resources (diagrams, tables, code)
5. **Assembler:** Final validation and assembly

**Input:**
- `temp_content_id`: Source material
- `num_students`: Number of students (1-120)
- `cognitive_level`: Bloom level
- `selected_cos`: Target COs
- `hardness`: easy/medium/hard

**Output:**
- Master assignment with items
- Student-specific assignments
- Per-item: title, description, deliverables, rubric, co_ids

---

### 2.3 Question Paper Generation

**Feature:** Comprehensive exam paper generator with 3-step workflow

**Purpose:** Generate exam papers with proper structure, resources, and CO coverage

**CO Connection:**
- **Template Level:** Each section maps to COs via `bloom_taxonomy_mapping`
- **Question Level:** `co_id: str` on each question
- **CO Coverage Tracking:** `co_coverage: Dict[str, Dict]` tracks coverage
- **Validation:** CO ID format validated (e.g., "CO1", "LO2")

**Bloom's Taxonomy (K-CODE System):**
- **K1 = Remember** - Define, list, memorize, repeat, state
- **K2 = Understand** - Classify, describe, discuss, explain, summarize
- **K3 = Apply** - Execute, implement, solve, use, demonstrate
- **K4 = Analyze** - Differentiate, organize, relate, compare, contrast
- **K5 = Evaluate** - Appraise, argue, defend, judge, critique
- **K6 = Create** - Design, assemble, construct, develop, formulate

**Input Controls:**
- `bloom_emphasis: Dict[str, float]` - Weight Bloom levels
- `hardness_config: Dict[str, str]` - Per-Bloom hardness

**Workflow:**
1. **Step 1 - Generate Plan (Sync, 30-60s):** Creates question plan
2. **Step 2 - Review Plan (Optional):** Teacher reviews/modifies
3. **Step 3 - Generate Questions (Async, 3-5min):** Generates full questions

**Resource Generation:**
- **Types:** diagram, table, equation, code
- **Per-Question:** 0-2 resource types
- **Student Guidance:** Resources guide approach, NOT answers

---

### 2.4 Notes Generation

**Feature:** Cornell-style study notes generation

**Purpose:** Generate structured study notes using Cornell note-taking method

**CO Connection:** No direct CO mapping (general study materials)

**Bloom's Taxonomy:** Not directly used - uses difficulty levels (beginner, intermediate, advanced)

**Workflow Components:**
1. **PlannerAgent:** Creates teaching plan
2. **RefinementAgent:** Refines the plan
3. **MainNotesGenerator:** Generates main content
4. **CueGenerator:** Generates cue column (Cornell method)
5. **SummaryGenerator:** Creates summary section

**Input:**
- `topic`: Note topic
- `difficulty`: beginner/intermediate/advanced
- `content_type`: lecture/study-guide/summary/concept

**Output:**
- `main_notes`: Main content
- `cue_column`: Cornell cues
- `summary`: Section summary

---

### 2.5 Course Context Service

**Feature:** Manage course-level learning outcomes and topic taxonomy

**Purpose:** Store and manage Course Outcomes (COs) for validation during generation

**CO Structure:**
```python
{
    "id": "CO1",
    "description": "Outcome text",
    "bloom_level": "apply",
    "related_topics": ["topic1", "topic2"],
    "competency_areas": ["skill1", "skill2"]
}
```

**Bloom's Taxonomy:**
- Each LearningOutcome has a `bloom_level` field
- Used for validating generated questions align with intended cognitive level

---

## 3. Student Tools

### 3.1 Flashcard Generation

**Feature:** Generate flashcards from study materials

**Purpose:** Create flashcards for active recall learning

**CO Connection:**
- **CO Mapping:** When `course_id` provided, fetches course context with Learning Outcomes
- **LO-Aware Generation:** Uses `FLASHCARD_GENERATOR_WITH_LO_PROMPT`
- **Metadata:** `mapped_learning_outcomes` - Linked LO IDs

**Bloom's Taxonomy:**
- **Levels Used:** remember, understand, apply
- **Detection:** Extracts `detected_bloom_levels` from LLM response
- **Target Levels:** Extracted from course context LOs

**Input:**
- `input_text`: Study material text
- `file`: Or upload file
- `user_query`: Specific focus topic
- `difficulty`: very_easy|easy|medium|hard|very_hard
- `course_id`: From Studio for LO mapping

**Output:**
- `flashcards`: Generated flashcard deck
- `metadata`: mapped_learning_outcomes, detected_bloom_levels, covered_topics

---

### 3.2 Mindmap Generation

**Feature:** Generate visual mind maps in Markdown format

**Purpose:** Create hierarchical mind maps for visual learning

**CO Connection:**
- **CO Mapping:** Same as flashcards - uses course context when available
- **LO-Aware Prompt:** `MINDMAP_GENERATOR_WITH_LO_PROMPT`

**Bloom's Taxonomy:**
- **Levels Used:** understand, analyze, create
- **Focus on:** Concept relationships and hierarchical understanding

**Input:** Same as flashcards

**Output:**
- `mindmap`: Hierarchical mindmap structure (Markdown)
- Same `metadata` format as flashcards

---

### 3.3 Knowledge Graph Generation

**Feature:** Generate JSON knowledge graphs showing concept relationships

**Purpose:** Create visual knowledge graphs for understanding connections

**CO Connection:**
- **CO Mapping:** `KNOWLEDGE_GRAPH_GENERATOR_WITH_LO_PROMPT`
- Same course context integration as other tools

**Bloom's Taxonomy:**
- **Levels Used:** analyze, evaluate
- **Focus on:** Concept relationships and hierarchical understanding

**Input:** Same as mindmap

**Output:**
- `knowledge_graph`: Graph with nodes, edges, relationships (JSON)
- Same `metadata` format

---

### 3.4 Chat with Documents (RAG)

**Feature:** AI-powered chat for querying uploaded documents

**Purpose:** Ask questions about uploaded study materials

**CO Connection:** No direct CO mapping - general Q&A on documents

**Bloom's Taxonomy:** Not applicable - general document Q&A

**RAG Pipeline:**
1. **Document Ingestion:** Upload and index documents
2. **Query Processing:** Ask questions with RAG
3. **Session Management:** Chat session persistence

**Retrieval Strategies:**
- `BASIC`: Simple vector search
- `EXPANSION`: Query expansion with LLM
- `RERANKING`: FlashRank reranking
- `CONVERSATIONAL`: Context-aware from chat history

---

### 3.5 Learning Sessions

**Feature:** Guided learning experiences with todos and roadmaps

**Purpose:** Create structured learning paths with progress tracking

**CO Connection:**
- **Course Linking:** Can be linked to course via `course_id`
- **Todo Generation:** Auto-generates learning todos
- **Future:** CO mapping planned for todo generation

**Bloom's Taxonomy:** Not yet implemented in todo generation

**Features:**
1. Session creation with auto-generated todos
2. Studio linking for resource storage
3. Todo management with progress tracking
4. Resource generation (mindmaps, flashcards, KGs)
5. Quiz integration
6. Weak topic analysis

---

### 3.6 Studio Management

**Feature:** Container workspace for organizing student learning resources

**Purpose:** Organize learning resources by course

**CO Connection:**
- Studios can be linked to courses
- Linked courses provide LOs for generation tools

**Bloom's Taxonomy:** Not directly - comes from linked course during generation

---

### 3.7 Usage Tracking

**Feature:** Monthly quota management for student tools

**Purpose:** Track and limit student tool usage

**Usage Types:**
- `flashcard_generation`
- `mindmap_generation`
- `knowledge_graph_generation`
- `chat_request`

**Limits:** Based on user plan (FREE, PRO, etc.) with monthly reset

---

## 4. Core & Utility Features

### 4.1 Storage & File Management

**Feature:** S3/MinIO storage client

**Purpose:** Object storage for files, documents, and generated content

**Key Features:**
- Connection pooling (50 max pool connections)
- Adaptive retry strategy (3 attempts)
- Presigned URL generation
- Recursive and non-recursive directory listing
- Batch deletion (1000 objects per batch)

**Storage Path Structure:** `org={org}/dept={dept}/course={course}/...`

---

### 4.2 Notifications System

**Feature:** Real-time notifications with DragonflyDB pub/sub

**Purpose:** Push notifications to clients with persistent history

**Architecture:**
- **Live Delivery:** DragonflyDB pub/sub (`mentron:notif:{user_id}`)
- **History Storage:** DragonflyDB Hash with 30-day TTL
- **Client Delivery:** SSE endpoint at `/notifications/stream`

**Notification Types:**
| Type | Description |
|------|-------------|
| `GRADE_UPDATED` | AI evaluation completed |
| `GRADE_VERSION` | Teacher manual grade change |
| `REREVIEW_RECEIVED` | Teacher gets student request |
| `REREVIEW_RESOLVED` | Student gets teacher decision |

---

### 4.3 Background Tasks & Workers

**Feature:** Split worker architecture

**Purpose:** Process background jobs with specialized workers

**Worker Types:**
| Worker | Queues | Purpose |
|--------|--------|---------|
| FACULTY | quiz_generation, assignment_generation, note_generation, qp_generation | Faculty content |
| STUDENT | flashcards_generation, mindmap_generation, knowledge_graph_generation, chat_generation | Student tools |
| SYSTEM | auto_feedback_generation, auto_assignment_evaluation, mem0_cleanup, markdown_conversion | Background tasks |
| UNIVERSAL | All queues | Legacy single-worker mode |

**Concurrency:**
- Faculty: 64, Student: 32, System: 16
- uvloop enabled on Linux for 2-4x performance boost

---

### 4.4 Service Factory (DI Container)

**Feature:** Request-scoped service caching

**Purpose:** Reduce object creation overhead with dependency injection

**Supports 40+ Services:**
- UserService, CourseContentService, CourseManagementService
- QuizGeneratorService, QuizAnalyticsService
- AssignmentSubmissionService, AssignmentEvaluationService
- And many more...

---

### 4.5 Grade Service

**Feature:** Centralized grade computation

**Purpose:** Single source of truth for grade calculations

**Features:**
- Org-level configurable grade scales
- Fallback to default 4.0 scale
- Caching for org configs (1-hour TTL)
- Edge case handling (score > 100, negative, None)

---

### 4.6 Share Links

**Feature:** Shareable link generation

**Purpose:** Create time-limited public access to quizzes/assignments

**Features:**
- Nanoid-based tokens (12 chars)
- JWT-based authentication
- 7-day default expiry
- Collision retry with max 5 attempts
- Use tracking

---

### 4.7 Re-Review Requests

**Feature:** Grade re-review system

**Purpose:** Allow students to request grade reviews

**Flow:**
1. Student requests re-review (within 7 days)
2. Teachers receive notification
3. Teacher reviews queue
4. Teacher resolves (approve/reject/partial)
5. Student receives notification

**Constraints:**
- One active request per item
- 7-day re-review window
- Grade must be finalized

---

## 5. Analytics System

### 5.1 Course Analytics

**Feature:** Course-level analytics

**Purpose:** Provide comprehensive course performance insights

**Components:**
- **QuizAnalyticsResponse:** Complete quiz analytics
- **AssignmentAnalyticsResponse:** Assignment analytics
- **CourseOverviewAnalytics:** Course overview
- **AtRiskStudent:** At-risk student detection

**Grade Scale:**
| Grade | Score Range |
|-------|-------------|
| A | >= 85% |
| B | >= 70% |
| C | >= 55% |
| D | >= 45% |
| F | < 45% |

---

### 5.2 Student Activity Tracking

**Feature:** Track student engagement

**Activity Types:**
- LOGIN, SESSION_START, SESSION_END
- CONTENT_VIEW, ASSESSMENT_SUBMIT
- CHAT_USE, RESOURCE_ACCESS

**Engagement Score:** 0-100 based on:
- Session count (max 25)
- Content views (max 20)
- Assessment submits (max 25)
- Days active (max 15)
- Recency (max 15)

**Engagement Levels:**
- **High:** 80-100
- **Moderate:** 60-79
- **At-Risk:** 40-59
- **Disengaged:** <40

---

### 5.3 Gradebook

**Feature:** Complete student gradebook

**Purpose:** Track all student grades in one place

**Endpoints:**
- Student gradebook with mastery panel
- Class roster with grades/at-risk flags
- Grade override with reason
- Student flagging for intervention
- Export (CSV/PDF)

---

## 6. LMS Integration

### 6.1 Canvas Integration

**Feature:** Canvas LMS synchronization

**Purpose:** Sync courses and enrollments from Canvas

**Auth Methods:**
- **OAuth:** Each user authorizes individually
- **Manual:** Org admin provides shared token

**Sync Flow:**
1. Get org Canvas configuration
2. Get access token
3. Create sync log entry
4. Sync courses → Sync enrollments
5. Update sync log with results

---

## Bloom's Taxonomy Reference

### Levels and Action Verbs

| Level | Action Verbs | Quiz Focus |
|-------|-------------|------------|
| **Remember** | define, list, memorize, repeat, state | Recall facts |
| **Understand** | classify, describe, discuss, explain, summarize | Explain concepts |
| **Apply** | execute, implement, solve, use, demonstrate | Apply knowledge |
| **Analyze** | differentiate, organize, relate, compare, contrast | Break down concepts |
| **Evaluate** | appraise, argue, defend, judge, critique | Make judgments |
| **Create** | design, assemble, construct, develop, formulate | Create new things |

### K-CODE Mapping (Question Papers)

- **K1 = Remember**
- **K2 = Understand**
- **K3 = Apply**
- **K4 = Analyze**
- **K5 = Evaluate**
- **K6 = Create**

---

## Summary Table

| Feature | CO Connection | Bloom Usage | Workflow Type |
|---------|---------------|-------------|---------------|
| Quiz Generation | `selected_cos`, per-question `co_ids` | `bloom_emphasis`, per-question level | LangGraph (3 agents) |
| Assignment Generation | `selected_cos`, per-item `co_ids` | `cognitive_level` (single) | LangGraph (5 agents) |
| Question Paper | Template mapping, per-question `co_id` | K-codes (K1-K6), `bloom_emphasis` | 3-step (Plan→Review→Generate) |
| Notes Generation | None | Difficulty levels only | LangGraph (5 agents) |
| Flashcards | `course_id` → LO mapping | `detected_bloom_levels` | LangGraph (4 agents) |
| Mindmap | `course_id` → LO mapping | `detected_bloom_levels` | LangGraph (3 agents) |
| Knowledge Graph | `course_id` → LO mapping | `detected_bloom_levels` | LangGraph (3 agents) |
| Course Context | Manages CO definitions | Per-CO `bloom_level` | CRUD service |
| Learning Sessions | Planned | Not yet | CRUD + generation |

---

*Generated: 2026-03-15*
*Mentron FastAPI Backend*
