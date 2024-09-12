from services import *
from pages.homepage import homepage
from pages.dashboard import dashboard

def main():
    email, username, linked_banks, balance, token, isGuest = homepage()
    print("\nWelcome to the Universal Finance Hub (UFH) console!")
    dashboard(email, username, linked_banks, balance, token, isGuest)
    input(f"\n{username}@UFH> ")

if __name__ == "__main__":
    main()

