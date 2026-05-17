# 🖥️ OS Lab Visualizer: Making Computers Easy to Understand

Have you ever wondered how your computer, phone, or tablet manages to do a hundred things at once without crashing? How does it play a YouTube video, download a file, and let you type an email all at the exact same time?

The invisible "brain" that manages all this chaos is called the **Operating System (OS)** (like Windows, macOS, or Android). 

Normally, university students learn how this "brain" works by doing incredibly complex math on whiteboards. It is boring, confusing, and very hard to picture. **That is why we built the OS Lab Visualizer.**

This project is a visual website that turns those complex computer math problems into fun, easy-to-understand animations. You don't need to know how to code to use it. You just press "Simulate", and watch the computer make decisions step-by-step!

Here is a simple explanation of exactly what this website shows:

---

### 1. CPU Scheduling (The Restaurant Kitchen)
Imagine a busy restaurant kitchen with only one Chef (the CPU). 
There are 10 different waiters shouting orders at the Chef at the same time. How does the Chef decide what to cook first? 
* Does he cook the fastest meal first? 
* Does he cook whoever ordered first? 
* Does he cook everything for 2 minutes and then switch, so nobody gets too angry?

**What our website does:** It lets you pretend to be the waiters handing in orders. Then, it creates a colorful timeline (called a Gantt Chart) showing exactly how the Chef decides to cook the meals step-by-step.

### 2. Disk Scheduling (The Delivery Driver)
Imagine a delivery driver who has to drop off 5 packages in a city.
* If he just drives in the random order the packages were handed to him, he will waste a ton of gas driving back and forth across town.
* But if he plans his route to hit the closest houses first, or sweeps from one side of the city to the other, he saves time and fuel.

**What our website does:** A computer's hard drive has a mechanical arm that moves back and forth to find your files. Our website draws a graph that shows exactly how the mechanical arm "plans its driving route" to find your files as fast as possible.

### 3. Memory Management (The Restaurant Hostess)
Imagine you are a Hostess at a restaurant. You have a few empty tables of different sizes.
A group of 4 people walks in. Do you seat them at a massive table for 10? Or do you try to find a table that perfectly fits exactly 4 people so you don't waste space?

**What our website does:** When you open an app on your phone, it takes up "space" (Memory). Our website shows colorful blocks filling up with apps, demonstrating how the computer tries to perfectly fit apps into the available space without leaving awkward, unusable gaps.

### 4. Deadlock Detection (The Traffic Jam)
Imagine four cars arrive at a four-way stop sign at the exact same time. 
Car A can't move until Car B moves. Car B can't move until Car C moves. Car C is waiting for Car D, and Car D is waiting for Car A.
Everyone is stuck. Nobody can move. This is called a **Deadlock**.

**What our website does:** Computers can get into traffic jams too (which causes your screen to freeze!). Our website runs a famous test called the "Banker's Algorithm" to predict if a traffic jam is about to happen, and flashes a big green "Safe" badge if the computer successfully avoided the crash.

### 5. Page Replacement (The Bookshelf)
Imagine you have a tiny bookshelf that only fits 3 books. 
You are studying, and you need to put a 4th book on the shelf. Because it's full, you *must* throw one of the old books away. Which one do you throw away?
* The one you haven't read in the longest time?
* The one you put on the shelf first?

**What our website does:** Computers only have a tiny amount of ultra-fast memory. When it gets full, it has to throw data out to make room for new data. Our visualizer shows tiny boxes (bookshelves) and animates exactly which data gets thrown out and why.

---

### 🌟 Why This Project is Special
* **It's like a movie:** Instead of instantly giving you the answer, our website forces the computer to slow down. It animates everything step-by-step so you can watch it "think."
* **No installation required:** Because we built this using modern web technology (React), you don't need to download anything. It works instantly right inside Google Chrome, Safari, or on your iPhone!
* **It's beautiful:** We designed it to look like a premium, expensive piece of software. It has a Dark Mode, translucent glass effects, and beautifully colored charts that make learning fun instead of exhausting.

### 🚀 How to use it
If you want to try it yourself:
1. Open the website.
2. Click any tool on the left side menu (like "Memory Management").
3. Make sure the "Real-time Simulation" box is checked.
4. Click the big **"Simulate"** button and watch the magic happen!
