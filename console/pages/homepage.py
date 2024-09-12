from getpass import getpass
from utils import clear_terminal, display_ufh
from services import get_balance, login, signup
from pages.about import about

def homepage():
    clear_terminal()
    display_ufh()
    while True:
        choice = input("1. Login \n2. Signup \n3. Continue as guest \n4. About \n5. exit\n\nUFH> ")
        isGuest = False
        if choice == '1':
            email = input("Enter your email: ")
            password = getpass("Enter your password: ")
            user = login(email, password)
            if user and 'token' in user["data"]:
                token = user["data"]["token"]
                username = user["data"]["user"]["username"]
                balance = get_balance(token, "bybit")
                linked_banks = ["", ""]
                break
        elif choice == '2':
            email = input("Enter your email: ")
            password = getpass("Enter your password: ")
            username = input("Enter a username: ")
            user = signup(email, password, username)
            if user:
                token = user["data"]["token"]
                balance = get_balance(token, "bybit")
                linked_banks = ["", ""]
                break
        elif choice == '3':
            username = "Guest"
            email = "guest@test.com"
            balance = 500
            linked_banks = ["", ""]
            token = ""
            isGuest = True
            break
        elif choice == '4':
            about()
        elif choice == '5':
            exit(0)
        else:
            print("Invalid choice, please try again.")
    return email, username, linked_banks, balance, token, isGuest

if __name__ == "__main__":
    homepage()

