import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

file_order = [
    "Формулировка контекста и проблеммы.txt",
    "1 Вопросы для определения идеального конечного результата.txt",
    "1 Ответы на вопросы по определение идеального конечного результата.txt",
    "2 Вопросы на анлиз противоречий.txt",
    "2 Ответы на вопросы про анализ противоречий.txt",
    "3 Вопросы по примененияю метода системного оператора.txt",
    "3 Ответы на вопросы про метод системного оператора.txt",
    "4 Вопросы применяющие вепольный анализ.txt",
    "4 Ответы на вопросы по вепольному анализу.txt",
    "5 1-5 вопросы из 40 изобритальельских приемов ТРИЗ.txt",
    "5 ответы на вопросы 1-5 из 40 изобритальельских приемов ТРИЗ.txt",
    "6 6-15 вопросы из 40 изобритальельских приемов ТРИЗ.txt",
    "6 ответы на вопросы 6-15 из 40 изобритальельских приемов ТРИЗ.txt",
    "7 16-25 вопросы из 40 изобритальельских приемов ТРИЗ.txt",
    "7 ответы на вопросы 16-25 из 40 изобритальельских приемов ТРИЗ.txt",
    "8 26-35 вопросы из 40 изобритальельских приемов ТРИЗ.txt",
    "8 ответы на вопросы 26-35 из 40 изобритальельских приемов ТРИЗ.txt",
    "9 36-40 вопросы из 40 изобритальельских приемов ТРИЗ.txt",
    "9 ответы на вопросы 36-40 из 40 изобритальельских приемов ТРИЗ.txt",
    "10 вопросы на законы развития технических систем.txt",
    "10 ответы на вопросы на законы развития технических систем.txt",
    "11 вопросы по методу маленьких человечков.txt",
    "11 ответы на вопросы по методу маленьких человечков.txt",
    "12 вопросы применяющие этапы АРИЗ.txt",
    "12 ответы вопросы применяющие этапы АРИЗ.txt",
    "13 вопросы по методу фокальных объектов.txt",
    "13 ответы на вопросы по методу фокальных объектов.txt",
    "14 вопросы применяющие морфологический анализ.txt",
    "14 ответы на вопросы применяющие морфологический анализ.txt"
]
# Пути к возможным шрифтам
font_paths = [
    '/Library/Fonts/Arial.ttf',
    '/Library/Fonts/Times New Roman.ttf',
    '/System/Library/Fonts/Times.ttc',
    '/System/Library/Fonts/Helvetica.ttc'
]

# Пытаемся зарегистрировать один из шрифтов
for font_path in font_paths:
    if os.path.exists(font_path):
        font_name = os.path.splitext(os.path.basename(font_path))[0]
        pdfmetrics.registerFont(TTFont(font_name, font_path))
        break
else:
    font_name = 'Helvetica'  # Используем Helvetica, если ничего не найдено
    print("Не найден подходящий шрифт, используется Helvetica")


def create_pdf(directory, output_filename):
    doc = SimpleDocTemplate(output_filename, pagesize=letter,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=18)
    
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='Russian',
                              fontName=font_name,
                              fontSize=12,
                              leading=14,
                              firstLineIndent=20))  # Добавляем отступ первой строки
    
    # Модифицируем существующие стили для заголовков
    styles['Heading1'].fontName = font_name
    styles['Heading2'].fontName = font_name
    
    content = []
    
    # Создаем оглавление
    content.append(Paragraph("Оглавление", styles['Heading1']))
    for filename in file_order:
        content.append(Paragraph(filename[:-4], styles['Russian']))
        content.append(Spacer(1, 6))  # Добавляем небольшой пробел после каждого пункта оглавления
    content.append(Spacer(1, 0.5*inch))
    
    # Добавляем содержимое файлов
    for filename in file_order:
        if os.path.exists(os.path.join(directory, filename)):
            content.append(Paragraph(filename[:-4], styles['Heading2']))
            content.append(Spacer(1, 0.1*inch))  # Пробел после заголовка
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                text = file.read()
                paragraphs = text.split('\n')
                for para in paragraphs:
                    if para.strip():  # Проверяем, что параграф не пустой
                        content.append(KeepTogether([
                            Paragraph(para, styles['Russian']),
                            Spacer(1, 12)  # Пробел после каждого параграфа
                        ]))
            content.append(Spacer(1, 0.2*inch))  # Дополнительный пробел между файлами
        else:
            print(f"Файл не найден: {filename}")
    
    doc.build(content)

# # Использование функции
create_pdf("/Users/vladimir/Downloads/work/triz", "triz.pdf")

# import os

# directory = "/Users/vladimir/Downloads/work/triz"  # Замените на реальный путь

# print("Файлы в директории:")
# for file in os.listdir(directory):
#     print(file)

# print("\nПроверка файлов из file_order:")
# for file in file_order:
#     full_path = os.path.join(directory, file)
#     if os.path.exists(full_path):
#         print(f"Найден: {file}")
#     else:
#         print(f"Не найден: {file}")