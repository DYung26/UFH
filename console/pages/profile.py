import time
from utils import clear_terminal, display_ufh
from services import get_account_balance, profile, get_total_balance

def profile_page(token, isGuest):
    clear_terminal()
    display_ufh()
    print("\nLoading profile...")
    if isGuest:
        time.sleep(1)
        email = "guest@test.com"
        username = "Guest"
        total_balance = "Test_$500"
        accounts = [["Bybit", "Test_$250" ], ["PayPal", "Test_$250"]]
    else:
        user = profile(token)
        email = user["data"]["existingUser"]["email"]
        username = user["data"]["existingUser"]["username"]
        total_balance = get_total_balance(token)
        accounts = get_account_balance(token)
    print(f'''
▪️ email: {email}

▪️ username: {username}

▪️ balance: {total_balance}

▪️ linked accounts:
        ▪️ {accounts[0][0] if len(accounts) > 0 else ""}: {accounts[0][1] if len(accounts) > 0 else ""} [-]
        ▪️ {accounts[1][0] if len(accounts) > 1 else ""}: {accounts[1][1] if len(accounts) > 1 else ""} [-]
...
▪️ Go back    [b]
''')
    while True:
        choice = input(f"{username}@UFH> ")
        if choice == 'b':
            return
        else:
            print("Invalid choice, please try again.\n")

