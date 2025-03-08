import pandas as pd
import psycopg2
from sqlalchemy import create_engine

# Step 1: Connect to PostgreSQL using SQLAlchemy
database_url = 'postgresql://luno:+emple2Knight@100.109.182.25:5433/Sample'  # Replace with your actual credentials
engine = create_engine(database_url)

# Step 2: Load the Excel file into a dictionary of dataframes (one for each sheet)
excel_file = 'SampleDB.xlsx'  # Replace with the path to your Excel file
xls = pd.ExcelFile(excel_file)

# Step 3: Loop through each sheet in the Excel file
for sheet_name in xls.sheet_names:
    # Read the sheet into a pandas DataFrame
    df = pd.read_excel(excel_file, sheet_name=sheet_name)
    
    # Optionally, create the table in PostgreSQL if it doesn't exist
    # df.to_sql(sheet_name, engine, if_exists='replace', index=False)  # Replace or append data

    # Step 4: Insert the data into PostgreSQL (assuming the table exists)
    df.to_sql(sheet_name, engine, if_exists='replace', index=False)
    print(f"Table {sheet_name} successfully imported into PostgreSQL")

print("All tables imported successfully!")
