from fpdf import FPDF
from fpdf.enums import XPos, YPos

# Настраиваемые параметры
TITLE_FONT_SIZE = 16
SUBTITLE_FONT_SIZE = 12
SECTION_TITLE_FONT_SIZE = 12
CONTENT_FONT_SIZE = 10
FOOTER_FONT_SIZE = 8

TITLE_HEIGHT = 9
SUBTITLE_HEIGHT = 5
SECTION_TITLE_HEIGHT = 6
CONTENT_LINE_HEIGHT = 5

TITLE_BOTTOM_MARGIN = 3
SECTION_TITLE_BOTTOM_MARGIN = 1
SECTION_BOTTOM_MARGIN = 2

PAGE_MARGIN = 10

FONT = "Calibri"

class PDF(FPDF):
    def header(self):
        self.set_font(FONT, "B", TITLE_FONT_SIZE)
        self.cell(0, TITLE_HEIGHT, "VLADIMIR PODLEVSKIKH", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
        self.set_font(FONT, "I", SUBTITLE_FONT_SIZE)
        self.cell(0, SUBTITLE_HEIGHT, "PYTHON DEVELOPER | AI & AUTOMATION SPECIALIST", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
        self.ln(TITLE_BOTTOM_MARGIN)

    def footer(self):
        self.set_y(-10)
        self.set_font(FONT, "I", FOOTER_FONT_SIZE)
        self.cell(0, 10, f"Page {self.page_no()}", new_x=XPos.RIGHT, new_y=YPos.TOP, align="C")

    def section_title(self, title):
        self.set_font(FONT, "B", SECTION_TITLE_FONT_SIZE)
        self.cell(0, SECTION_TITLE_HEIGHT, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="L")
        self.ln(SECTION_TITLE_BOTTOM_MARGIN)

    def section_content(self, content):
        self.set_font(FONT, "", CONTENT_FONT_SIZE)
        self.multi_cell(0, CONTENT_LINE_HEIGHT, content)
        self.ln(SECTION_BOTTOM_MARGIN)

    def add_section(self, title, content):
        self.section_title(title)
        self.section_content(content)

pdf = PDF(orientation="P", unit="mm", format="A4")
pdf.set_auto_page_break(auto=True, margin=PAGE_MARGIN)

# Path to Calibri font files
font_base_path = "/Volumes/Untitled/python/namebogsecret.github.io.git/namebogsecret.github.io/pdf_crator/"

# Add Calibri font variants from the specified paths
pdf.add_font(FONT, "", font_base_path + "calibril.ttf", uni=True)
pdf.add_font(FONT, "B", font_base_path + "calibril.ttf", uni=True)
pdf.add_font(FONT, "I", font_base_path + "calibril.ttf", uni=True)
pdf.add_font(FONT, "BI", font_base_path + "calibril.ttf", uni=True)

# Now you can safely add a page and use the Calibri font
pdf.add_page()

# Contact Details
contact_details = (
    "Yerevan, Armenia | vladimir@podlevskikh.com | +374 55 873 402\n"
    "LinkedIn | GitHub | Full Certifications"
)
pdf.add_section("CONTACT DETAILS", contact_details)

# Languages
languages = "English (IELTS: 6) - Russian (Native) - Japanese (JLPT N5)"
pdf.add_section("LANGUAGES", languages)

# Technical Competencies
tech_competencies = (
    "Software Solutions, Python Development, Best Practices, MySQL, Web Applications, Flask, API, "
    "Code Review & Quality, Debug, Git, REST, JavaScript, HTML, CSS, Linux, Bash Scripting, "
    "Cybersecurity, Django Web"
)
pdf.add_section("TECHNICAL COMPETENCIES", tech_competencies)

# Career Summary
career_summary = (
    "An innovative Python Developer and AI & Automation specialist with over 3 years of experience in web development "
    "and software solution implementation. Enacts lasting change through AI implementation, coordinating the tools for "
    "machine learning, automation and web development. Eager to empower future operations."
)
pdf.add_section("CAREER SUMMARY", career_summary)

# Interpersonal Skills
interpersonal_skills = (
    "Collaborative, Mentoring, Interpersonal Communication, Self-Starter, Creative Problem Solver, "
    "Technical Documentation, Attention to Detail, Simplifying the Complex, Sales Strategies"
)
pdf.add_section("INTERPERSONAL SKILLS", interpersonal_skills)

# Professional Experience
creator_founder = (
    "Creator & Founder - Python Developer & AI Specialist\n"
    "Podlevskikh Digital Innovations - Remote | 2020 - Current\n"
    "KEY ACHIEVEMENTS:\n"
    "- Creates and implements a GPT-4 Powered Telegram Bot with a full-featured AI assistant, using OpenAI's GPT-4 API\n"
    "- Develops a server manager by implementing a telegram-based software solution, reducing maintenance time by 400%\n"
    "- Led a 300% customer base growth by implementing a customer service automation system\n"
    "RESPONSIBILITIES:\n"
    "- Innovates client process with a tailored API, increasing clientele 5x using a 24/7 bot for personalized messages\n"
    "- Delivers digital and social media content automation, including Instagram bot using DALL-E and GPT-4\n"
    "- Directs software solutions and Python development for best practice innovations"
)
pdf.add_section("PROFESSIONAL EXPERIENCE", creator_founder)

# Physics & Mathematics Tutor
tutor = (
    "Physics & Mathematics Tutor\n"
    "Independent Tutor - Remote & On-site | 2003 - Current\n"
    "KEY ACHIEVEMENTS:\n"
    "- Maintained over 95% satisfaction, preparing students for top universities (MIT, MSU, MSTU, HSE)\n"
    "- Automated student acquisition process to increase the number of students and expand network"
)
pdf.section_content(tutor)

# PHP Web Developer
php_developer = (
    "PHP Web Developer\n"
    "Advector - Moscow, Russia | 2007 - 2008\n"
    "KEY ACHIEVEMENTS:\n"
    "- Created an accurate heat map for information management using JavaScript, Microsoft Outlook, MySQL, HTML, WordPress\n"
    "- Developed expertise in web development, system administration and database optimization"
)
pdf.section_content(php_developer)

# Qualifications
qualifications = (
    "Open Source Contributor, AI Certification, Python Certification, Web Development, Data Structures, "
    "Deep Learning Prerequisites (Numpy), Self-Driving Car Course, Django Web Development, Database Design, "
    "MySQL, Linux, Bash Script, Financial Analysis, 3D Modeling (Blender), API Testing, Cybersecurity"
)
pdf.add_section("QUALIFICATION (Full List Above)", qualifications)

# Education
education = (
    "Master of Science (MS) in Geology/Earth Science\n"
    "Moscow State University - Moscow, Russia | 1999 - 2006\n"
    "NOTABLE: Excelled in the number 1 school to study maths in Russia, requiring the highest standard of excellence"
)
pdf.add_section("EDUCATION", education)

# Save the PDF
pdf_file_path = "Vladimir_Podlevskikh_Resume_Compact_c.pdf"
pdf.output(pdf_file_path)

print(f"Компактное резюме в PDF формате создано: {pdf_file_path}")
