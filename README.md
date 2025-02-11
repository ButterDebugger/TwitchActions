# Installation

1.  Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

2.  Add the chrome extension to your browser:

    -   Navigate to `chrome://extensions` in your browser
    -   Enable `Developer Mode` by clicking the toggle switch

        Can most likely be found in the top right

    -   Click the `Load unpacked` button and select the extension directory

3.  Add the browser source to OBS

    Set the URL to `http://localhost:3672`

# Usage

## Before Streaming

1.  Start the webserver by running the following command:

    ```bash
    python server.py
    ```

    Or simply double-click the `start.bat` file

## During Streaming

1.  Open a Twitch chat
2.  Hover over a chat message and click the highlight button

    The chat message should be visible in the browser source

3.  To remove the chat message, click the extension and click the `Remove Highlight` button

    The chat message should be removed from the browser source

# License

MIT License
