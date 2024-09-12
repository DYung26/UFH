import time
from utils import clear_terminal, display_ufh
from services import profile, get_balance

def profile_page(token, isGuest):
    clear_terminal()
    display_ufh()
    print("\nLoading profile...")
    if isGuest:
        time.sleep(1)
        email = "guest@test.com"
        username = "Guest"
        balance = "Test_$500"
        linked_banks = ["Bybit", "PayPal"]
    else:
        user = profile(token)
        email = user["data"]["existingUser"]["email"]
        username = user["data"]["existingUser"]["username"]
        balance = get_balance(token, "bybit")
        linked_banks = ["", ""]
    print(f'''
▪️ email: {email}
▪️ username: {username}
▪️ balance: {balance}
▪️ linked accounts:
        ▪️ {linked_banks[0]} [-]
        ▪️ {linked_banks[1]} [-]
...
▪️ Go back    [b]
''')
    while True:
        choice = input(f"{username}@UFH> ")
        if choice == 'b':
            return
        else:
            print("Invalid choice, please try again.\n")

