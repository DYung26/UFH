
from utils import clear_terminal, display_ufh, paginate_text


def about():
    clear_terminal()
    display_ufh()
    paginate_text("""
===============================================================================
                             UNIVERSAL FINANCE HUB
===============================================================================

Welcome to Universal Finance Hub (UFH), your all-in-one platform for managing 
both traditional fiat and cryptocurrency accounts. UFH brings together your 
financial life, allowing you to easily link, track, and interact with all your 
accounts from one central hub.

At UFH, we believe in simplifying financial management, whether you're dealing 
with multiple bank accounts or crypto wallets. With UFH, you no longer need to 
juggle multiple platforms. Our goal is to provide a seamless and secure way to 
handle all your finances in one place.

Current Features:
-----------------
- Link and manage both fiat and crypto accounts 
- Supports integration with popular platforms like Bybit
- Secure access and management of your financial data
- User-friendly console interface

Future Vision:
--------------
As UFH continues to grow, we aim to expand support for additional banks and 
cryptocurrency exchanges. We are also exploring the integration of Open Banking 
and blockchain technology to enhance transparency and security.

About the Developer:
--------------------
Hi, I'm Daniel Oyekunle, the sole developer behind UFH. I have a passion for 
technology and digital finance, and this project was born from the need to have 
a single platform to manage my personal finances across both fiat and 
cryptocurrency accounts. I built the backend using NodeJS, Express, PostgreSQL, 
and TypeScript, and created the console interface using Python. 

Connect with me on GitHub:
---------------------------
For the source code and ongoing development of UFH, visit my GitHub repository:
https://github.com/DYung26/UFH


Try the UFH Console:
---------------------
The UFH console app is live and ready for you to explore. Start managing your 
finances more efficiently with our console interface today!

Join us on this journey to revolutionize the way you manage your finances!

===============================================================================
""")

