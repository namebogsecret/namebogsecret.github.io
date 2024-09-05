from fpdf import FPDF
from fpdf.enums import XPos, YPos
from fpdf import HTMLMixin

# Настраиваемые параметры
TITLE_FONT_SIZE = 16
SUBTITLE_FONT_SIZE = 12
SECTION_TITLE_FONT_SIZE = 12
CONTENT_FONT_SIZE = 10

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
    # def header(self):
    #     self.set_text_color(56, 83, 145)
    #     self.set_font(FONT, "B", TITLE_FONT_SIZE)
    #     self.cell(0, TITLE_HEIGHT, "VLADIMIR PODLEVSKIKH", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")
    #     self.set_font(FONT, "I", SUBTITLE_FONT_SIZE)
    #     # self.set_x(14)
    #     self.cell(0, SUBTITLE_HEIGHT, "PYTHON DEVELOPER | AI & AUTOMATION SPECIALIST", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C") # , align="L")
    #     self.ln(TITLE_BOTTOM_MARGIN)
    #     self.set_text_color(0, 0, 0)
        # self.set_x(10)

    # Убираем footer, чтобы не было "Page 1"
    # def footer(self):
    #     self.set_y(-10)
    #     self.set_font(FONT, "I", FOOTER_FONT_SIZE)
    #     self.cell(0, 10, f"Page {self.page_no()}", new_x=XPos.RIGHT, new_y=YPos.TOP, align="C")

    def section_title(self, title, align="L"):
        self.set_text_color(56, 83, 145)
        self.set_font(FONT, "B", SECTION_TITLE_FONT_SIZE)
        self.cell(0, SECTION_TITLE_HEIGHT, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align=align)
        self.ln(SECTION_TITLE_BOTTOM_MARGIN)
        self.set_text_color(0, 0, 0) 

    def section_content(self, content, left_margin=14):
        self.set_x(left_margin)
        self.set_font(FONT, "", CONTENT_FONT_SIZE)
        self.multi_cell(0, CONTENT_LINE_HEIGHT, content)
        self.ln(SECTION_BOTTOM_MARGIN)
        self.set_x(10)
        # paragraphs = content.split("\n")
        # for paragraph in paragraphs:
        #     self.multi_cell(0, CONTENT_LINE_HEIGHT, paragraph)
        #     self.ln(SECTION_BOTTOM_MARGIN)
        #     self.set_x(left_margin)


    def add_experience(self, title, company, location, years):
        self.set_font(FONT, "B", CONTENT_FONT_SIZE)
        # Выводим название профессии и выравниваем влево
        self.cell(0, CONTENT_LINE_HEIGHT, title, ln=0, align="L")
        self.set_font(FONT, "", CONTENT_FONT_SIZE)
        # Позиционируем курсор для вывода годов
        self.set_x(-50)  # Отступ от правого края (корректируйте значение, если нужно)
        # Выводим годы и выравниваем по правому краю
        self.cell(40, CONTENT_LINE_HEIGHT, years, ln=1, align="R")
        
        # Выводим компанию и локацию на следующей строке
        self.cell(0, CONTENT_LINE_HEIGHT, f"{company} - {location}", ln=1, align="L")
        self.ln(SECTION_BOTTOM_MARGIN)


    def add_section(self, title, content):
        self.section_title(title)
        if content != "":
            self.section_content(content)

    def add_hyperlink(self, description, text, url):
        self.set_font(FONT, "", CONTENT_FONT_SIZE)
        # self.write(CONTENT_LINE_HEIGHT, description + " ")
        self.set_text_color(0, 0, 255)  # Синий цвет для ссылок
        self.write(CONTENT_LINE_HEIGHT, text, url)
        self.set_text_color(0, 0, 0)  # Возвращаем цвет текста в черный


def create_pdf(pdf_file_path, job_title = "PYTHON DEVELOPER | AI & AUTOMATION SPECIALIST", utm_source = None):

    pdf = PDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=PAGE_MARGIN)

    # Path to Calibri font files
    font_base_path = "/Volumes/Untitled/python/namebogsecret.github.io.git/namebogsecret.github.io/pdf_crator/"

    # Add Calibri font variants from the specified paths
    pdf.add_font(FONT, "", font_base_path + "calibril.ttf", uni=True)
    pdf.add_font(FONT, "B", font_base_path + "Calibri Bold.TTF", uni=True)
    pdf.add_font(FONT, "I", font_base_path + "Calibri Italic.ttf", uni=True)
    pdf.add_font(FONT, "BI", font_base_path + "Calibri Bold Italic.ttf", uni=True)

    # Now you can safely add a page and use the Calibri font
    pdf.add_page()

    # Вывод заголовка и подзаголовка с названием вакансии
    pdf.set_text_color(56, 83, 145)
    pdf.set_font(FONT, "B", TITLE_FONT_SIZE)
    pdf.cell(0, TITLE_HEIGHT, "VLADIMIR PODLEVSKIKH", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")
    pdf.set_font(FONT, "I", SUBTITLE_FONT_SIZE)
    pdf.cell(0, SUBTITLE_HEIGHT, job_title, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="C")
    pdf.ln(TITLE_BOTTOM_MARGIN)
    pdf.set_text_color(0, 0, 0)

    # # Contact Details
    # contact_details = (
    #     "Yerevan, Armenia | vladimir@podlevskikh.com | +374 55 873 402\n"
    #     "LinkedIn: [Your LinkedIn URL] | GitHub: [Your GitHub URL] | [Other Social Media or Links]"
    # )
    utm_addition = f"?utm_source={utm_source}" if utm_source else ""
    # Contact Details with clickable links in one line
    delimiter = " • " # " | "

    # pdf.section_title("CONTACT DETAILS", align="C")
    pdf.set_x(14)
    pdf.add_hyperlink("Yerevan, Armenia:", "Yerevan, Armenia", "https://www.google.com/maps/place/Yerevan,+Armenia")
    pdf.write(CONTENT_LINE_HEIGHT, delimiter)
    pdf.add_hyperlink("Email:", "vladimir@podlevskikh.com", "mailto:vladimir@podlevskikh.com") # ?subject=Hello%20from%20your%20website")
    pdf.write(CONTENT_LINE_HEIGHT, delimiter)
    pdf.add_hyperlink("Phone:", "+374 55 873 402", "tel:+37455873402")
    pdf.write(CONTENT_LINE_HEIGHT, delimiter)
    # pdf.ln(SECTION_BOTTOM_MARGIN)  # Переход на новую строку после всех ссылок
    # pdf.ln(SECTION_BOTTOM_MARGIN)
    # pdf.ln(SECTION_BOTTOM_MARGIN)
    pdf.add_hyperlink("LinkedIn:", "LinkedIn @vladimir-podlevskikh", "https://www.linkedin.com/in/vladimir-podlevskikh")
    pdf.write(CONTENT_LINE_HEIGHT, delimiter)
    pdf.add_hyperlink("GitHub:", "GitHub", f"https://git.podlevskikh.com/{utm_addition}")
    pdf.write(CONTENT_LINE_HEIGHT, delimiter)
    pdf.add_hyperlink("Certificates:", "Full Certifications", f"https://cv.podlevskikh.com/certificates.html{utm_addition}")
    pdf.ln(SECTION_BOTTOM_MARGIN)  # Переход на новую строку после всех ссылок
    pdf.ln(SECTION_BOTTOM_MARGIN)
    pdf.ln(SECTION_BOTTOM_MARGIN)
    pdf.ln(SECTION_BOTTOM_MARGIN)  # Переход на новую строку после всех ссылок
    pdf.ln(SECTION_BOTTOM_MARGIN)
    pdf.ln(SECTION_BOTTOM_MARGIN)
    pdf.set_x(10)

    # Languages
    languages = "English (IELTS: 6 / B2 / Upper Intermediate) - Russian (Native) - Japanese (JLPT N5 / Beginner)"
    pdf.add_section("LANGUAGES", languages)

    # Technical Competencies
    tech_competencies = (
        "Software Solutions, Python Development, Best Practices, MySQL, Web Applications, Flask, API, "
        "Code Review & Quality, Debug, Git, REST, JavaScript, HTML, CSS, Linux, Bash Scripting"
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





    pdf.add_section("PROFESSIONAL EXPERIENCE", "")

    pdf.add_experience(
        title="Creator & Founder - Python Developer & AI Specialist",
        company="Podlevskikh Digital Innovations",
        location="Remote",
        years="2020 - Current"
    )
    # Professional Experience
    creator_founder = (
        # "Creator & Founder - Python Developer & AI Specialist\n"
        # "Podlevskikh Digital Innovations - Remote | 2020 - Current\n"
        "KEY ACHIEVEMENTS:\n"
        "• Creates and implements a GPT-4 Powered Telegram Bot with a full-featured AI assistant, using OpenAI's GPT-4 API\n"
        "• Develops a server manager by implementing a telegram-based software solution, reducing maintenance time by 400%\n"
        "• Led a 300% customer base growth by implementing a customer service automation system\n"
        "RESPONSIBILITIES:\n"
        "• Innovates client process with a tailored API, increasing clientele 5x using a 24/7 bot for personalized messages\n"
        "• Delivers digital and social media content automation, including Instagram bot using DALL-E and GPT-4\n"
        "• Directs software solutions and Python development for best practice innovations"
    )
    pdf.section_content(creator_founder)

    pdf.add_experience(
        title="Physics & Mathematics Tutor",
        company="Independent Tutor",
        location="Remote & On-site",
        years="2003 - Current"
    )

    # Physics & Mathematics Tutor
    tutor = (
        # "Physics & Mathematics Tutor\n"
        # "Independent Tutor - Remote & On-site | 2003 - Current\n"
        "KEY ACHIEVEMENTS:\n"
        "• Maintained over 95% satisfaction, preparing students for top universities (MIT, MSU, MSTU, HSE)\n"
        "• Automated student acquisition process to increase the number of students and expand network"
    )
    pdf.section_content(tutor)

    pdf.add_experience(
        title="PHP Web Developer",
        company="Advector",
        location="Moscow, Russia",
        years="2007 - 2008"
    )

    # PHP Web Developer
    php_developer = (
        # "PHP Web Developer\n"
        # "Advector - Moscow, Russia | 2007 - 2008\n"
        "KEY ACHIEVEMENTS:\n"
        "• Created an accurate heat map for information management using JavaScript, Microsoft Outlook, MySQL, HTML, WordPress\n"
        "• Developed expertise in web development, system administration and database optimization"
    )
    pdf.section_content(php_developer)

    # Qualifications
    qualifications = (
        "Open Source Contributor, AI Certification, Python Certification, Web Development, Data Structures, "
        "Deep Learning Prerequisites (Numpy), Self-Driving Car Course, Django Web Development, Database Design, "
        "MySQL, Linux, Bash Script, Financial Analysis, 3D Modeling (Blender), API Testing"
    )
    pdf.add_section("QUALIFICATION (Full List Above)", qualifications)

    pdf.add_section("EDUCATION", "")


    pdf.add_experience(
        title="Lomonosov Moscow State University (MSU)",
        company="Master of Science (MS) in Geology/Earth Science",
        location="Moscow, Russia",
        years="1999 - 2006"
    )

    # Education
    education = (
        # "Master of Science (MS) in Geology/Earth Science\n"
        # "Moscow State University - Moscow, Russia | 1999 - 2006\n"
        "NOTABLE: Excelled in the number 1 school (№57) to study maths in Russia, requiring the highest standard of excellence"
    )
    pdf.section_content(education)
    pdf.output(pdf_file_path)


if __name__ == "__main__":
    # Save the PDF
    pdf_file_path = "Vladimir_Podlevskikh_CV.pdf"
    utm_source = "uk_0509"
    create_pdf(pdf_file_path, utm_source = utm_source)

    print(f"Резюме в PDF формате создано: {pdf_file_path}")
