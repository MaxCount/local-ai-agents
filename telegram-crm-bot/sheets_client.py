"""Google Sheets API client for CRM."""
import json
import os
from datetime import datetime
from typing import Optional

import gspread
from google.oauth2 import service_account


class SheetsClient:
    """Client for Google Sheets operations."""

    COLUMNS = [
        "Дата/Время",      # A - Date/Time
        "Чей контакт",      # B - Whose contact
        "Имя/Должность",   # C - Name/Position
        "Телефон",          # D - Phone
        "Город",            # E - City
        "Сайт/Что продают",# F - Website/What they sell
        "Когда перезвонить",# G - When to call back
        "Доп. информация", # H - Additional info
        "Инфо из визитки",  # I - Business card info
        "Статус извлечения" # J - Extraction status
    ]

    def __init__(self, credentials_json: str, spreadsheet_id: str):
        """
        Initialize the Google Sheets client.

        Args:
            credentials_json: JSON string with service account credentials, or path to JSON file
            spreadsheet_id: ID of the Google Spreadsheet
        """
        import os
        
        if os.path.isfile(credentials_json):
            with open(credentials_json, 'r') as f:
                credentials_dict = json.load(f)
        else:
            credentials_dict = json.loads(credentials_json)
        credentials = service_account.Credentials.from_service_account_info(
            credentials_dict,
            scopes=[
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/drive.readonly"
            ]
        )
        self.client = gspread.authorize(credentials)
        self.spreadsheet_id = spreadsheet_id
        self.sheet = self.client.open_by_key(spreadsheet_id).sheet1

    def initialize_headers(self):
        """Initialize spreadsheet with column headers if not present."""
        headers = self.sheet.row_values(1)
        if not headers or headers[0] != self.COLUMNS[0]:
            self.sheet.insert_row(self.COLUMNS, 1)

    def get_all_records(self) -> list:
        """Get all records from the spreadsheet (excluding header)."""
        return self.sheet.get_all_records() if self.sheet.row_count > 1 else []

    def find_by_phone(self, phone: str) -> Optional[dict]:
        """
        Find a record by phone number.

        Args:
            phone: Phone number to search for

        Returns:
            Dictionary with record data or None if not found
        """
        records = self.get_all_records()
        for i, record in enumerate(records, start=2):
            if record.get("Телефон") == phone:
                return {"row": i, "data": record}
        return None

    def find_by_name(self, name: str) -> list:
        """
        Find records by name (partial match).

        Args:
            name: Name to search for

        Returns:
            List of matching records
        """
        records = self.get_all_records()
        matches = []
        for i, record in enumerate(records, start=2):
            record_name = record.get("Имя/Должность", "")
            if name.lower() in record_name.lower():
                matches.append({"row": i, "data": record})
        return matches

    def add_record(self, data: dict) -> int:
        """
        Add a new record to the spreadsheet.

        Args:
            data: Dictionary with record data

        Returns:
            Row number of the new record
        """
        row = [
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            data.get("whose_contact", ""),
            data.get("name", ""),
            data.get("phone", ""),
            data.get("city", ""),
            data.get("website", ""),
            data.get("callback_date", ""),
            data.get("additional_info", ""),
            data.get("card_info", ""),
            data.get("status", "новый")
        ]
        self.sheet.append_row(row)
        return self.sheet.row_count

    def merge_record(self, data: dict, existing_row: int) -> dict:
        """
        Merge new data with existing record (fill only empty fields).

        Args:
            data: New data to merge
            existing_row: Row number of existing record

        Returns:
            Dictionary showing what was updated
        """
        current = self.sheet.row_values(existing_row)
        while len(current) < len(self.COLUMNS):
            current.append("")

        updates = {}

        fields_mapping = {
            1: ("whose_contact", "Чей контакт"),
            2: ("name", "Имя/Должность"),
            3: ("phone", "Телефон"),
            4: ("city", "Город"),
            5: ("website", "Сайт/Что продают"),
            6: ("callback_date", "Когда перезвонить"),
            7: ("additional_info", "Доп. информация"),
            8: ("card_info", "Инфо из визитки"),
            9: ("status", "Статус извлечения")
        }

        for idx, (key, col_name) in fields_mapping.items():
            current_value = current[idx] if idx < len(current) else ""
            new_value = data.get(key, "")

            if (not current_value or current_value == "не указано") and new_value:
                updates[col_name] = {"old": current_value, "new": new_value}
                current[idx] = new_value

        if updates:
            self.sheet.update(f"A{existing_row}:J{existing_row}", [current])

        return updates

    def update_record(self, row: int, data: dict):
        """
        Update a specific record.

        Args:
            row: Row number
            data: Dictionary with updated data
        """
        row_data = [
            data.get("timestamp", ""),
            data.get("whose_contact", ""),
            data.get("name", ""),
            data.get("phone", ""),
            data.get("city", ""),
            data.get("website", ""),
            data.get("callback_date", ""),
            data.get("additional_info", ""),
            data.get("card_info", ""),
            data.get("status", "")
        ]
        self.sheet.update(f"A{row}:J{row}", [row_data])

    def get_stats(self, days: int = 30) -> dict:
        """
        Get statistics for the specified number of days.

        Args:
            days: Number of days to look back

        Returns:
            Dictionary with statistics
        """
        records = self.get_all_records()
        from datetime import timedelta

        cutoff_date = datetime.now() - timedelta(days=days)

        total = 0
        recent = 0

        for record in records:
            try:
                date_str = record.get("Дата/Время", "")
                if date_str:
                    record_date = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
                    total += 1
                    if record_date >= cutoff_date:
                        recent += 1
            except (ValueError, TypeError):
                continue

        return {
            "total_leads": total,
            "leads_last_days": recent,
            "period_days": days
        }
