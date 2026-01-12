# Prompt Refinement - Sample Inputs & Outputs

Below are 5 diverse examples demonstrating how the system processes various inputs (Ambiguous Text, Product Sketch, Legacy Doc, Feature Request, Hybrid).

---

## Example 1: The "Vague Idea" (Text Input)

**Raw Input:**
> "I want a version of Tinder but for adopting dogs. Users should be able to swipe left or right. Shelters can upload photos. Need it to be safe."

**Refined Output (JSON):**

```json
{
  "project_metadata": {
    "title": "Dog Adoption Swiping App",
    "type": "Mobile App",
    "complexity_level": "Medium"
  },
  "core_intent": "Connect potential pet adopters with shelter dogs using a familiar 'swipe' interface to gamify and simplify the discovery process.",
  "functional_requirements": [
    {
      "feature": "User Matching Interface",
      "priority": "Must Have",
      "description": "Card-stack interface displaying dog profiles (photo, name, age) with swipe gestures (Right=Like, Left=Pass)."
    },
    {
      "feature": "Shelter Dashboard",
      "priority": "Must Have",
      "description": "Web or App portal for verified shelters to upload dog profiles and manage matches."
    },
    {
      "feature": "Safety/Verification System",
      "priority": "Must Have",
      "description": "Verification mechanism for shelters to prevent fraud (e.g., nonprofit document upload)."
    }
  ],
  "technical_specifications": {
    "suggested_stack": ["React Native (Mobile)", "Node.js (Backend)", "PostgreSQL (Data)", "AWS S3 (Image Storage)"],
    "constraints": ["High trust/safety requirements"]
  },
  "user_experience": {
    "target_audience": ["Dog Adopters (General Public)", "Animal Shelter Staff"],
    "design_preferences": "Playful, warm, trustworthy, image-centric."
  },
  "ambiguities_and_questions": [
    "Does a 'match' initiate a direct chat, or just share contact info?",
    "How does the system handle geographical radius? (e.g., only show dogs within 50km)",
    "Do we need a vetting process for adopters before they can chat?"
  ]
}
```

---

## Example 2: The "Broken Dashboard" (Screenshot/Image Input)

**Raw Input (Description of Image):**
> *User uploads a crude wireframe drawn on a napkin showing a graph, a table of users, and a big 'Export PDF' button. Text annotation says: "Admin panel for HR".*

**Refined Output (JSON):**

```json
{
  "project_metadata": {
    "title": "HR Admin Dashboard",
    "type": "Web App",
    "complexity_level": "Low"
  },
  "core_intent": "Provide HR administrators with a centralized view of user analytics and management capabilities.",
  "functional_requirements": [
    {
      "feature": "Analytics Visualization",
      "priority": "Must Have",
      "description": "Line or bar chart displaying user activity/growth trends over time."
    },
    {
      "feature": "User Management Table",
      "priority": "Must Have",
      "description": "Data grid listing employees with columns for Name, Role, Status, and Actions (Edit/Delete)."
    },
    {
      "feature": "Reporting",
      "priority": "Should Have",
      "description": "One-click 'Export PDF' functionality for current data views."
    }
  ],
  "technical_specifications": {
    "suggested_stack": ["Next.js (Frontend)", "Chart.js or Recharts (Viz)", "Prisma (ORM)"],
    "constraints": ["Must be print-friendly for PDF export"]
  },
  "user_experience": {
    "target_audience": ["HR Managers", "System Admins"],
    "design_preferences": "Clean, data-dense, professional, high-contrast."
  },
  "ambiguities_and_questions": [
    "What specific metrics should be on the graph? (New hires? Retention?)",
    "Does the 'Export PDF' need to include the raw data table or just the charts?",
    "Is role-based access control (RBAC) needed for different levels of HR admins?"
  ]
}
```

---

## Example 3: The "Legacy Migration" (PDF/Doc Input)

**Raw Input (Simulated PDF Snippet):**
> "System currently runs on on-prem Oracle DB. Frontend is JSP. Need to move to Cloud. Must strictly adhere to GDPR. 500k daily users. Low latency required."

**Refined Output (JSON):**

```json
{
  "project_metadata": {
    "title": "Cloud Migration & Modernization",
    "type": "System",
    "complexity_level": "High"
  },
  "core_intent": "Migrate a high-traffic legacy JSP/Oracle system to a modern cloud-native architecture while ensuring GDPR compliance and performance.",
  "functional_requirements": [
    {
      "feature": "Cloud Infrastructure",
      "priority": "Must Have",
      "description": "Scalable cloud deployment (AWS/Azure) replacing on-premise hardware."
    },
    {
      "feature": "Database Migration",
      "priority": "Must Have",
      "description": "Migration of schematized data from Oracle to a managed cloud database (e.g., Aurora/Cloud SQL)."
    }
  ],
  "technical_specifications": {
    "suggested_stack": ["Java/Spring Boot or Node.js (Backend)", "React (Frontend)", "Terraform (IaC)", "AWS RDS"],
    "constraints": ["Strict GDPR Compliance", "Low Latency (<100ms)", "500k Daily Active Users"]
  },
  "user_experience": {
    "target_audience": ["Internal Enterprise Users", "End Customers"],
    "design_preferences": "Performance-first, minimalist."
  },
  "ambiguities_and_questions": [
    "What is the acceptable downtime window for the cutting over of the database?",
    "Are there stored procedures in Oracle that need to be rewritten in the application layer?",
    "Does 'GDPR' imply data sovereignty requirements (e.g., servers must be in EU)?"
  ]
}
```

---

## Example 4: The "Feature Add-On" (Mixed Input)

**Raw Input:**
> "Add a dark mode to our existing app. Also, can we have voice commands?"

**Refined Output (JSON):**

```json
{
  "project_metadata": {
    "title": "Accessibility & UI Enhancement Module",
    "type": "Web App",
    "complexity_level": "Low"
  },
  "core_intent": "Enhance user accessibility and comfort by introducing theming and voice control interfaces.",
  "functional_requirements": [
    {
      "feature": "Dark Mode Toggle",
      "priority": "Must Have",
      "description": "Global theme switcher (Light/Dark/System) persisting user preference."
    },
    {
      "feature": "Voice Command Interface",
      "priority": "Should Have",
      "description": "Microphone integration to execute basic app navigation or form filling via speech."
    }
  ],
  "technical_specifications": {
    "suggested_stack": ["CSS Variables / Tailwind (Theming)", "Web Speech API (Voice)"],
    "constraints": ["Must match existing brand colors in dark mode"]
  },
  "user_experience": {
    "target_audience": ["Night-time users", "Accessibility-needs users"],
    "design_preferences": "High contrast ratio for dark mode (WCAG AA)."
  },
  "ambiguities_and_questions": [
    "What specific actions should voice commands control? (Navigation only? Or complex data entry?)",
    "Do we need to support multiple languages for voice commands immediately?"
  ]
}
```

---

## Example 5: The "Technical API" (Text Input)

**Raw Input:**
> "I need a middleware that takes a Stripe webhook, validates the signature, and updates a user's credits in MongoDB. If it fails, retry 3 times."

**Refined Output (JSON):**

```json
{
  "project_metadata": {
    "title": "Payment Webhook Handler",
    "type": "System",
    "complexity_level": "Medium"
  },
  "core_intent": "Reliable backend service to process payment events and synchronize user entitlements.",
  "functional_requirements": [
    {
      "feature": "Webhook Validation",
      "priority": "Must Have",
      "description": "Verify cryptographic signature of incoming Stripe requests to ensure authenticity."
    },
    {
      "feature": "Idempotent Processing",
      "priority": "Must Have",
      "description": "Logic to update MongoDB user credits; must handle duplicate webhooks gracefully."
    },
    {
      "feature": "Retry Mechanism",
      "priority": "Must Have",
      "description": "Exponential backoff or queue-based retry strategy (up to 3 attempts) for failed updates."
    }
  ],
  "technical_specifications": {
    "suggested_stack": ["Node.js / Express", "MongoDB", "Redis (for queue/retries)"],
    "constraints": ["Data Consistency", "Security (Signature Verification)"]
  },
  "user_experience": {
    "target_audience": ["Developers (API Consumers)"],
    "design_preferences": "N/A (Backend Service)"
  },
  "ambiguities_and_questions": [
    "What should happen after 3 failed retries? (Dead Letter Queue? Email Alert?)",
    "Are there specific latency requirements for the webhook response to Stripe?"
  ]
}
```
