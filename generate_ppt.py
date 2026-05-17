from pptx import Presentation
from pptx.util import Pt
from pptx.dml.color import RGBColor

def set_font(shape):
    if not shape.has_text_frame:
        return
    for paragraph in shape.text_frame.paragraphs:
        for run in paragraph.runs:
            run.font.name = 'Times New Roman'

def add_slide(prs, layout_idx, title, content_list=None):
    slide = prs.slides.add_slide(prs.slide_layouts[layout_idx])
    title_shape = slide.shapes.title
    title_shape.text = title
    
    if content_list and len(slide.placeholders) > 1:
        body_shape = slide.placeholders[1]
        tf = body_shape.text_frame
        tf.text = content_list[0]
        for item in content_list[1:]:
            p = tf.add_paragraph()
            p.text = item
            p.level = 0
            
    for shape in slide.shapes:
        set_font(shape)
    return slide

prs = Presentation()

# Slide 1: Title
slide_layout = prs.slide_layouts[0]
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
subtitle = slide.placeholders[1]
title.text = "OS Lab Visualizer"
subtitle.text = "Project Report\nComprehensive Operating System Algorithm Simulation"
for shape in slide.shapes:
    set_font(shape)

# Slide 2: Introduction
add_slide(prs, 1, "Introduction", [
    "The OS Lab Visualizer is an interactive educational platform designed for students and educators.",
    "It aims to bridge the gap between theoretical operating system concepts and practical understanding.",
    "The application provides real-time, visual, step-by-step simulations of complex algorithms.",
    "It covers critical OS topics like CPU Scheduling, Disk Scheduling, Memory Management, Deadlock Detection, and Page Replacement.",
    "The platform is completely web-based, requiring no software installation."
])

# Slide 3: Objectives of the project
add_slide(prs, 1, "Objectives of the project", [
    "To provide a highly interactive and visual learning tool for Operating System algorithms.",
    "To allow step-by-step execution to help users track internal state changes over time.",
    "To create a modern, professional, and accessible user interface replacing outdated legacy visualizers.",
    "To support multiple scheduling, allocation, and replacement algorithms in a single unified dashboard.",
    "To generate accurate metrics like Waiting Time, Turnaround Time, and Page Faults instantly."
])

# Slide 4: Tech used
add_slide(prs, 1, "Tech used", [
    "Frontend Framework: React (for building dynamic and component-based UI).",
    "Styling: Tailwind CSS (for rapid, modern, and responsive styling without raw CSS files).",
    "Animations: Framer Motion (for smooth transitions and step-by-step visual ticking).",
    "Charting/Graphs: Recharts (for rendering dynamic Gantt charts and Disk Head Movement graphs).",
    "Icons: Lucide-React (for clean, professional scalable vector icons).",
    "Build Tool: Vite (for lightning-fast compilation and hot module replacement)."
])

# Slide 5: Features of the project
add_slide(prs, 1, "Features of the project", [
    "Real-Time Step-by-Step Simulation: Algorithms execute visually step-by-step, mimicking the passage of time.",
    "Comprehensive Dashboard: Centralized hub to access all OS modules.",
    "Dark & Light Mode: Professional SaaS-style theming accessible via a global toggle.",
    "Responsive Design: Seamless experience across desktops, tablets, and mobile devices.",
    "Dynamic Data Input: Users can freely add, remove, and modify processes, queues, and reference strings.",
    "Glassmorphism UI: Premium aesthetic utilizing translucent panels and clean typography."
])

# Slide 6: Modules of the project
add_slide(prs, 1, "Modules of the project", [
    "1. CPU Scheduling: FCFS, SJF, Round Robin, Priority.",
    "2. Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN, LOOK.",
    "3. Memory Management: First Fit, Best Fit, Worst Fit contiguous allocation.",
    "4. Deadlock Detection: Banker's Algorithm for Safe State analysis.",
    "5. Page Replacement: FIFO, LRU, Optimal algorithms."
])

# Slide 7: Working of the project
add_slide(prs, 1, "Working of the project", [
    "User selects a specific module from the sidebar navigation.",
    "User configures the input parameters (e.g., burst times, disk queues, memory blocks).",
    "User selects the specific algorithm to test from a dropdown menu.",
    "User toggles 'Real-time Simulation' and clicks 'Simulate'.",
    "The application processes the algorithm logic internally and returns the final dataset.",
    "The React UI iterates over the dataset on a timer, progressively rendering charts, tables, and statistics."
])

# Slide 8: Screenshots of project
add_slide(prs, 1, "Screenshots of project", [
    "[Please insert a screenshot of the Dashboard here]",
    "[Please insert a screenshot of the CPU Scheduling Gantt chart here]",
    "[Please insert a screenshot of the Disk Scheduling Head Movement graph here]",
    "[Please insert a screenshot of the Deadlock Detection Safe Sequence here]",
    "(The screenshots will visually demonstrate the premium UI and functional components of the platform)"
])

# Slide 9: Advantages of the project
add_slide(prs, 1, "Advantages of the project", [
    "Highly Educational: Transforms abstract OS math into tangible visual sequences.",
    "Zero Setup Required: Runs completely in the web browser without backend dependencies.",
    "Instant Feedback: Students immediately see how changing a burst time affects the Gantt chart.",
    "Modern Aesthetic: Feels like a premium developer tool rather than an academic project.",
    "Open Architecture: React's component structure makes adding new algorithms extremely easy."
])

# Slide 10: Limitations of the project
add_slide(prs, 1, "Limitations of the project", [
    "Frontend Only: No database integration to save or share previous simulation scenarios.",
    "Scale Limits: Rendering thousands of processes step-by-step could cause browser performance issues.",
    "Non-Preemptive Priority: The current CPU module focuses on non-preemptive algorithms, missing some advanced preemptive edge cases.",
    "Screen Size constraints: Massive disk queues or Gantt charts require horizontal scrolling on smaller screens."
])

# Slide 11: Future scope
add_slide(prs, 1, "Future scope", [
    "Backend Integration: Adding Node.js/MongoDB to allow users to create accounts and save their test scenarios.",
    "More Algorithms: Implementing Multilevel Queue Scheduling and advanced preemptive techniques.",
    "Export Features: Allowing users to download the step-by-step execution results as a PDF or Excel file.",
    "Instructor Dashboard: Creating a mode where teachers can broadcast simulations to connected students in real-time."
])

# Slide 12: Conclusion
add_slide(prs, 1, "Conclusion", [
    "The OS Lab Visualizer successfully achieves its goal of simplifying complex Operating System concepts.",
    "By combining modern web technologies (React, Tailwind) with robust algorithmic logic, it delivers a seamless educational experience.",
    "The real-time visualization bridge the theoretical gap, making it a highly valuable tool for computer science students worldwide.",
    "It lays a strong foundation for future expansion into a complete, scalable OS learning platform."
])

prs.save('Project_Report.pptx')
print("Successfully generated Project_Report.pptx")
