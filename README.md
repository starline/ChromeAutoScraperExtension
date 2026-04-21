# Auto Info Parser (Chrome Extension)

Parses listing data from **iaai.com** and **copart.com** and copies it to the clipboard in a format suitable for pasting into Google Sheets.

## What the extension does

- Extracts:
  - Vehicle title (including engine type)
  - Odometer reading (numeric)
  - State
  - Page URL
- Copies data to the clipboard as TSV (tab-separated values)
- Supports different page layouts on IAAI and Copart

---

## Installation

1. **Download and unpack** the `AutoScraper` folder.
2. Open Chrome and go to the extensions page:

   ```
   chrome://extensions/
   ```

3. Turn on **Developer mode** (top right).
4. Click **Load unpacked**.
5. Select the unpacked `AutoScraper` folder.

---

## How to use

1. Open any lot detail page on iaai.com or copart.com.
2. Click the extension icon in the browser toolbar.
3. Click **Copy data**.
4. Paste into Google Sheets — values land in separate columns.

---

## Sample output

```
2017 FORD F150 - 3.5L 6	125606	TX	https://copart.com/lot/12345678
```

---

## Limitations

- Some pages may use a different layout — let the author know if something fails to parse.

---

Author: **Andri Huga**  
Version: 1.3
