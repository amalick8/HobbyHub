# 🚗 JDM Afterhours  
A neon-themed forum for late-night JDM car lovers. Users can create posts, upload images, upvote builds, leave comments, and browse the community feed with sorting, searching, and filters.

---

## 📸 GIF Walkthrough  
(Insert your GIF here)

---

## 🌐 Live Demo  
(Insert deployed link here)

---

## 📚 Overview  
JDM Afterhours is a fully-functional community forum built for my WEB102 Final Project.  
Users can create posts about their favorite cars, add images, leave comments, and engage with others through upvotes.  
The app is powered by **React + Supabase**, and styled with a clean neon theme inspired by JDM night culture.

---

# ✅ Required Features Implemented

### ✔ Create Form
- Users can create posts  
- Title is required  
- Optional: content + image URL  
- Saved directly to Supabase  

### ✔ Home Feed
- Displays existing posts  
- Shows: title, creation date, upvotes  
- Clicking a post opens full details  

### ✔ Sorting + Search
- Sort by newest or most upvoted  
- Search by post title  

### ✔ Post Page
- Shows full content + image  
- Shows comments section  
- Users can leave new comments  
- Post creator can edit or delete  
- Upvote button increases count instantly  

### ✔ Comments
- Comment input box  
- Comments saved to Supabase  
- Displayed live on the page  

### ✔ Upvotes
- Unlimited upvotes per post  
- Stored in database  

### ✔ Edit/Delete
- Users can update or remove posts  

### ✔ Additional UI Features
- Dark/light mode  
- Neon aesthetic design  
- Smooth rounded post cards  
- Responsive layout  
- Clean modern typography  

---

# 🌟 Stretch Features Completed
- Post tags (Build / Review / Question / etc.)  
- Tag filtering on the home feed  
- Light + dark mode toggle  
- A fully upgraded UI beyond requirements  

---

# 🛠 Technologies Used
- **React (Vite)**
- **Supabase**
- **JavaScript (ES6)**
- **CSS3**
- **React Router**
- **Git / GitHub**
- **Netlify / Vercel (optional for hosting)**

---

# 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your Supabase keys  
Create a `.env` file:
```env
VITE_SUPABASE_URL=YOUR_URL
VITE_SUPABASE_ANON_KEY=YOUR_KEY
```

### 4. Run the app
```bash
npm run dev
```

---

# 📄 Project Structure
```
/src
 ├── pages
 │    ├── Home.jsx
 │    ├── Create.jsx
 │    ├── Edit.jsx
 │    ├── PostPage.jsx
 │
 ├── supabaseClient.js
 ├── App.jsx
 ├── main.jsx
 ├── index.css
```

---

# 🙌 Acknowledgements
Built as the final project for **CodePath WEB102 — Intermediate Web Development (Fall 2025)**.

