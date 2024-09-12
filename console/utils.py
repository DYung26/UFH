import os
import platform

def display_ufh():
    print('''
 /$$   /$$ /$$$$$$$$ /$$   /$$
| $$  | $$| $$_____/| $$  | $$
| $$  | $$| $$      | $$  | $$
| $$  | $$| $$$$$   | $$$$$$$$
| $$  | $$| $$__/   | $$__  $$
| $$  | $$| $$      | $$  | $$
|  $$$$$$/| $$      | $$  | $$
 \\______/ |__/      |__/  |__/
  Universal Finance Hub (UFH)
''')

def clear_terminal():
    if platform.system() == "Windows":
        os.system('cls')
    else:
        os.system('clear')

def paginate_text(text, lines_per_page=42):
    lines = text.split('\n')
    total_lines = len(lines)
    
    for i in range(0, total_lines, lines_per_page):
        # Display a "page" of lines
        clear_terminal()
        display_ufh()
        chunk = lines[i:i+lines_per_page]
        print("\n".join(chunk))
        
        # Check if there are more lines to show
        if i + lines_per_page < total_lines:
            input("\n--More-- Press Enter to continue...")
        else:
            print("\n--End of content--\n")

