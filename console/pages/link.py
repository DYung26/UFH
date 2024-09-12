from utils import clear_terminal, display_ufh
from services import link;

def crypto_select(username, token, isGuest):
    print("Select which Crypto exchange to link:\nAvailable Exchanges:")
    print(f'''
+ ByBit      [BB]
+ Binance    [BN]
...
▪️ Go back    [b]
''')
    while True:
        exchange = input(f"\n{username}@UFH> ")
        if exchange == "BB":
            print("ByBit\nSubmit your ByBit API KEY and API SECRET with the following permissions:")
            print("\n.\n.\n.")
        elif exchange == "BN":
            print("Binance\nSubmit your Binance API KEY and API_SECRET with the following permissions:")
            print("\n.\n.\n.")
        elif exchange == "b":
            break
        else:
            print("Invalid choice, please try again.")
        key = input("API KEY: ")
        secret = input("API SECRET: ")
        if not isGuest:
            link(token, key, secret)
        print("Linked successfully!")
        if input(f"▪️ Go back    [b]\n\n{username}@UFH> ") == "b":
            break
        else:
            print("Invalid choice, please try again.")

def bank_select(username, token, isGuest):
    print("\nSelect which Bank to link:\n\nAvailable Banks:")
    print(
f'''    + PayPal [P]
    + Revolut [R]
...
▪️ Go back [b]
''')
    while True:
        bank = input(f"\n{username}@UFH> ")
        if bank == "P":
            print("PayPal is coming...please, hold tight")
        elif bank == "R":
            print("Revolut is coming...please hold tight")
        elif bank == "b":
            break
        else:
            print("Invalid choice, please try again.")

def fin_type(username, token, isGuest):
    print("Select what type of Financial Account you want to link:")
    print(f'''
▪️ Banking(Fiat)   [B]
▪️ Crypto Exchange [C]
...
▪️ Go back         [b]
''')
    while True:
        fin_type = input(f"\n{username}@UFH> ")
        if fin_type == "B":
            bank_select(username, token, isGuest)
            break
        elif fin_type == "C":
            crypto_select(username, token, isGuest)
            break
        elif fin_type == 'b':
            break
        else:
            print("Invalid choice, please try again.")

def link_account(username, token, isGuest):
    clear_terminal()
    display_ufh()
    fin_type(username, token, isGuest)

