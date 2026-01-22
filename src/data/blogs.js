// Helper function to calculate reading time
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/[#*`\[\]()]/g, '').trim();
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime || 1;
};

export const blogs = [
  {
    id: 1,
    title: "My First Blog Post",
    content: "This is the content of my first blog post.",
    date: "2024-01-15",
    tags: ["General", "Personal"],
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
    excerpt: "Exploring the current Bitcoin landscape, its recent surge, and whether it's a smart investment or financial folly.",
    featured: true,
  },
];

// Add reading time to each blog
blogs.forEach(blog => {
  blog.readingTime = calculateReadingTime(blog.content);
});
