import time
from utils import clear_terminal, display_ufh
from pages.link import link_account
from services import logout;
from pages.profile import profile_page

def dashboard(email, username, accounts: list, total_balance, token, isGuest: bool ):
    while True:
        clear_terminal()
        display_ufh()
        print("\nLoading dashboard...")
        if isGuest:
            time.sleep(1)
        print("\nWelcome to your dashboard!")
        print(
f'''                                         ==== DASHBOARD ====
USERNAME: {username}            EMAIL: {email}           LINKED BANKS: []

▪️ Dashboard    [d] |                                                  BALANCE: ${total_balance}
▪️ Profile      [p] |                                                  ACCOUNTS:
▪️ Transactions [t] |                                                      ▪️ {accounts[0][0] if len(accounts) > 0 else ""}: {accounts[0][1] if len(accounts) > 0 else ""} [-]
▪️ Logout       [l] |                                                      ▪️ {accounts[1][0] if len(accounts) > 1 else ""}: {accounts[1][1] if len(accounts) > 1 else ""} [-]
                                                                           ▪️ Link a new bank  [+]
                                         ===================
''')
        print("Enter the letters in square brackets to navigate the dashboard")
        print("\ne.g. d ::: Dashboard | - ::: unlink bank | p ::: profile")
        while True:
            navigate = input(f"\n{username}@UFH> ")
            if navigate == "d":
                break
            elif navigate == "l":
                if isGuest:
                    exit(0)
                logout(token)
                exit(0)
            elif navigate == "p":
                profile_page(token, isGuest)
                break
            elif navigate == "+":
                link_account(username, token, isGuest)
                break
            else:
                print("Invalid choice, please try again.")

