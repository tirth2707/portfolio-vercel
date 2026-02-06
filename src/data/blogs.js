// Helper function to calculate reading time
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/[#*`\[\]()]/g, "").trim();
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime || 1;
};

// Import RAG blog content from markdown file
import ragBlogContent from './blogs_rag.md?raw';

export const blogs = [
  {
    id: 1,
    title: `The Truth About "All-in-One" AI Plans`,
    content: `ately, startups are offering access to premium tools like **ChatGPT Plus**, **Claude Pro**, **Gemini Advanced**, and **Midjourney** for as low as **₹499/month**. Before you buy, it is important to understand the technical trade-offs involving tokens and temperature.

---

## 📖 Table of Contents
1. [What Are Tokens?](#-1-what-are-tokens)
2. [Understanding Temperature](#-2-understanding-temperature)
3. [Comparison Table](#-comparison-official-vs-cheap-resellers)
4. [The Verdict](#-the-verdict)

---

## 🧩 1. What Are Tokens?

Think of **tokens** as the currency of AI. Large Language Models (LLMs) don't read words; they read chunks of characters called tokens.

* **"Artificial Intelligence"** ≈ 3 tokens
* **"Hello, how are you?"** ≈ 5 tokens

> [!CAUTION]
> **The Catch:** Every token used costs the provider money. To keep prices at ₹499, cheap platforms often:
> * **Limit Context:** They restrict how much text the AI can "remember" or read at once.
> * **Model Downgrading:** They may route your request to cheaper, older models.
> * **Truncation:** Long answers are often cut off mid-sentence to save processing power.

---

## 🎚️ 2. Understanding Temperature

**Temperature** is a setting that determines the "creativity" or randomness of the AI's response.

| Setting | Value | Result |
| :--- | :--- | :--- |
| **🧊 Low** | 0.0 – 0.3 | Factual, precise, and highly predictable. |
| **🔥 High** | 0.7 – 1.0 | Creative, diverse, and more human-like. |

**Why it matters:** Cheap resellers often lock the temperature to a **low value**. This makes the AI less likely to "hallucinate" (making things up), which saves them support costs, but it makes your "ChatGPT clone" feel robotic, dull, and repetitive.

---

## 📊 Comparison: Official vs. Cheap Resellers

| Feature | Official Premium Plans | Cheap "All-in-One" Resellers |
| :--- | :--- | :--- |
| **Price** | Standard (~$20/mo) | Ultra Low (~₹499/mo) |
| **Privacy** | High (Direct) | Low (Data goes through 3rd-party proxy) |
| **Tokens** | Full Context Window | Heavily Throttled |
| **Creativity** | Fully Adjustable | Often Hard-Coded/Locked |
| **Reliability** | High Uptime | Unstable (Risk of account bans) |

---

## 🎯 The Verdict

Understanding these technicalities helps you make smarter choices. While budget plans are tempting for casual use, they often sacrifice the very "intelligence" that makes premium AI valuable. 

**Make smarter, safer choices in this AI-driven world. 🌍**

---
`,
    date: "2025-11-15",
    tags: ["General", "AI"],
    category: "Personal",
    excerpt: "A brief introduction to my blogging journey.",
  },
  {
    id: 2,
    title: "The Bitcoin Debate: Smart Investment or Financial Folly?",
    content: `
# The Bitcoin Debate: Smart Investment or Financial Folly?

> **Author:** Tirth Shah  
> **Date:** Dec 1, 2024  
> **Read Time:** 3 min read

---

## 🚀 The Current Landscape
In India, cryptocurrency is often met with skepticism—labeled as a scam or an illegal risk. Yet, while traditional markets face volatility, Bitcoin continues to shatter all-time highs, triggering widespread FOMO (Fear Of Missing Out).

Bitcoin is currently trading around **$94,000**, delivering staggering returns:
* **Last 3–4 weeks:** ~80% Return
* **Last 6 months:** ~113% Return

---

## 🔍 Why the Sudden Surge?
Historically, Bitcoin faced two massive hurdles. Recent developments have shifted the narrative:

### 1. The Storage Problem (Solved by ETFs)
Previously, investors feared losing passwords or physical hard disks. In mid-2024, **BlackRock** (the world's largest investment firm) introduced **Bitcoin ETFs**.
- **How it works:** They manage the Bitcoin; you own the units (similar to mutual funds).
- **Impact:** No more hacking stress or password recovery issues.

### 2. The Recognition Problem (The "Trump" Factor)
The US election results have been a game-changer. With **Donald Trump's** victory, the US stance has shifted toward:
- Treating Bitcoin as a strategic reserve asset.
- Promoting the US as a crypto hub.

---

## 📊 Bitcoin vs. Traditional Assets

| Feature | US Dollars (Fiat) | Gold & Silver | Bitcoin (BTC) |
| :--- | :--- | :--- | :--- |
| **Supply** | Unlimited (Govt prints) | Finite (But unknown) | **Strictly 21 Million** |
| **Control** | Centralized (Govt) | Centralized (Mining) | **Decentralized (Blockchain)** |
| **Inflation** | High (Value drops) | Store of Value | **Deflationary Asset** |
| **Portability** | High | Low | **Extremely High** |

---

## 💡 Is it the right time to invest?
Cryptocurrency remains an **extremely risky asset**. However, its potential for appreciation is undeniable. 

### The Scarcity Argument
- **Total Supply:** 21,000,000
- **Currently Mined:** ~19,790,000
- **The Vision:** When all coins are mined and demand remains high, the price becomes unimaginable because no government can "print" more or stop the blockchain.

> [!IMPORTANT]
> **Disclaimer:** This content is shared solely for knowledge purposes. Bitcoin is a volatile asset. Please consult with your financial advisor before making any investment decisions.

---

**Thank you for reading!** *— Tirth Shah*`,
    date: "2024-12-01",
    tags: ["Finance", "Cryptocurrency", "Investment"],
    category: "Finance",
    excerpt:
      "Exploring the current Bitcoin landscape, its recent surge, and whether it's a smart investment or financial folly.",
    featured: true,
  },
  {
    id: 3,
    title: "RAG Is the New Database: How Software Engineers Should Think in 2026",
    content: ragBlogContent,
    date: "2026-01-15",
    tags: ["AI", "RAG", "Database", "Software Engineering"],
    category: "Technology",
    excerpt: "Exploring how RAG is transforming the way we think about data storage and retrieval in the AI-native era.",
    featured: true,
  },
];

// Add reading time to each blog
blogs.forEach((blog) => {
  blog.readingTime = calculateReadingTime(blog.content);
});
