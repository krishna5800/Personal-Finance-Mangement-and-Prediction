import json
import random
from datetime import datetime, timedelta

# Indian names for users
indian_names = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Krishna", "Ishaan", "Aryan", "Dhruv",
    "Ayaan", "Kabir", "Rudra", "Aarush", "Anika", "Diya", "Myra", "Saanvi", "Anaya", "Aadhya",
    "Riya", "Sara", "Ira", "Shanaya", "Aarohi", "Ishita", "Kavya", "Navya", "Zara", "Suhana"
]

# Helper function to generate random dates
def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days))

# Optimized function to generate random expenses
def generate_expenses(start_date, num_days):
    categories = {
        "Miscellaneous": (30, 250),
        "Utilities": (200, 400),
        "Education": (20, 250),
        "Entertainment": (25, 200),
        "Healthcare": (30, 200),
        "Food": (10, 450),
        "Transportation": (15, 215),
        "Housing": (1500, 3000)
    }

    expenses = []
    for day in range(num_days):
        total_expense = 0
        daily_expenses = []
        housing_added = False
        num_categories = random.randint(1, 4)

        # Determine total expense range for the day
        expense_range_prob = random.random()
        if expense_range_prob <= 0.75:
            expense_range = (350, 450)
        elif expense_range_prob <= 0.95:
            expense_range = (400, 600)
        else:
            expense_range = (500, 750)

        categories_sample = random.sample(list(categories.items()), num_categories)
        remaining_budget = expense_range[1]

        for i, (category, price_range) in enumerate(categories_sample):
            if category == "Housing" and housing_added:
                continue

            # Adjust logic to ensure we don't generate an invalid range
            if remaining_budget < price_range[0]:
                continue  # Skip this category if the remaining budget is less than the category's minimum

            # For the last category, ensure it fits within the budget
            if i == num_categories - 1:
                amount = max(price_range[0], min(price_range[1], remaining_budget))
            else:
                amount = random.randint(price_range[0], min(price_range[1], remaining_budget))

            daily_expenses.append({"category": category, "amount": amount, "date": start_date.strftime("%Y-%m-%d")})
            total_expense += amount
            remaining_budget -= amount

            if category == "Housing":
                housing_added = True

        expenses.extend(daily_expenses)
        start_date += timedelta(days=1)

    return expenses

# Optimized function to generate users
def generate_users(num_users, start_date_range, end_date_range):
    users = []
    used_names = set()

    for user_id in range(1, num_users + 1):
        while True:
            user_name = random.choice(indian_names)
            if user_name not in used_names:
                used_names.add(user_name)
                break

        if not user_name:
            user_name = f"user{user_id}"

        email = f"{user_name.lower()}@example.com"
        phone = f"+91{random.randint(7000000000, 9999999999)}"
        password = f"pass{user_id}"

        start_date = random_date(start_date_range, end_date_range)
        num_days = random.randint(365, 547)
        expenses = generate_expenses(start_date, num_days)

        users.append({
            "UserID": user_id,
            "User_Name": user_name,
            "Email": email,
            "Phone": phone,
            "Password": password,
            "Expenses": expenses
        })

    return users

# Define date ranges
start_date_range = datetime(2022, 9, 1)
end_date_range = datetime(2023, 8, 20)
present_date = datetime(2024, 9, 18)

# Generate 20 users
users_data = generate_users(20, start_date_range, present_date)

# Save to JSON file
file_path = "users_expenses_optimized.json"
with open(file_path, "w") as f:
    json.dump(users_data, f, indent=4)

print(f"Data saved to {file_path}")
