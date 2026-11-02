ROHAN'S LEGENDARY DAY — WEBSITE GUIDE
====================================

WHO THIS WEBSITE IS FOR
----------------------
Birthday boy: Rohan Palui
Creator and sender of all birthday wishes: Subhajit Das
The 12 wishes on wishes.html are all written from Subhajit to Rohan. Do not present them as wishes from other people.

HOW TO OPEN THE FULL JOURNEY
----------------------------
1. Extract the entire ZIP into one folder.
2. Keep all files together in the same folder (do not move HTML pages away from assets).
3. Double-click start.html. This is the intended opening page.
4. Follow the Next buttons in this order:
   start.html -> celebration.html -> friendship.html -> wishes.html -> letter.html
   -> gifts.html -> future.html -> quiz.html -> award.html -> share-card.html -> index.html
5. The navigation at the top lets you jump to any page. The footer links let you start again.
6. A modern browser (Chrome, Edge, Firefox) is recommended. No build tools are required.

FILES AND FOLDERS
-----------------
HTML pages: start.html, celebration.html, friendship.html, wishes.html, letter.html,
            gifts.html, future.html, quiz.html, award.html, share-card.html, index.html
Styles:     style.css
Scripts:    script.js and small page-specific scripts inside some HTML files
Images:     rohan-1.jpg, rohan-2.jpg, rohan-3.jpg
Music:      birthday-music.mp3
Optional existing award document: rohan-awards.pdf (if you add it)

HOW TO ADD / REPLACE IMAGES
---------------------------
1. Copy the image into this same folder, beside index.html and style.css.
2. Use simple filenames with no spaces, e.g. rohan-4.jpg or cricket-memory.png.
3. To change the slideshow, open friendship.html in a text editor and find:
      const pics=[['rohan-1.jpg','THE LEGEND'],['rohan-2.jpg','ROHAN · CORE MEMBER'],['rohan-3.jpg','A MOMENT TO REMEMBER']];
4. Add a new item in the same format, for example:
      ['rohan-4.jpg','A GREAT MEMORY']
   Ensure commas and quotation marks remain correctly placed. The image filename must match exactly.
5. To change the homepage's original photo gallery, edit the photos list near the top of script.js.
6. Use JPG or PNG. Resize very large photos before adding them so the website loads faster.

HOW TO ADD MUSIC / REPLACE THE SOUNDTRACK
----------------------------------------
1. Place your own MP3 file in the same folder as the HTML pages.
2. Rename it birthday-music.mp3, OR edit the src="birthday-music.mp3" value in the music player HTML on each page where the soundtrack appears.
3. The player has Play, Pause, and Volume controls. Browsers require a user click before sound starts; autoplay is intentionally not forced.
4. Keep music files you have permission to use. If the file is missing, the page still works, but music will not play.
5. On the original homepage, the existing Play Music button is controlled by script.js and uses the DATA.music value near the top of that file.

HOW TO EDIT THE 12 WISHES
-------------------------
1. Open wishes.html in a text editor.
2. Search for “WISH 01” or the message text you want to change.
3. Each card is marked “FROM SUBHAJIT”. Keep the sender as Subhajit Das, because these are the creator's wishes for Rohan.
4. Copy buttons copy one complete wish at a time. The wishes page does not accept messages from other senders.

HOW TO CHANGE THE COUNTDOWN DATE
--------------------------------
The current project birthday date is set to 27 November (the existing script uses month 11, day 27).
- In script.js, edit DATA.birthMonth and DATA.birthDay if the birthday date needs correction.
- In celebration.html, find the JavaScript date `new Date(now.getFullYear(),10,27,0,0,0)` and change 10 (November, zero-based) and 27 (day) to the correct date.
- In award.html, update the printed issue date if required.
- Keep dates consistent across pages. The countdown counts to the next occurrence of that month/day.

SECRET MESSAGE
--------------
The riddle on gifts.html is a fun reveal, not security or account authentication. The answer is a friendship-related word ("friendship"). Do not use this as a real password or for private information.

BIRTHDAY CERTIFICATE AND SHARE CARD
-----------------------------------
- award.html: use “Print / Save PDF” and choose Save as PDF in your browser's print dialog.
- share-card.html: “Save greeting PNG” generates an image in your browser. The Share button uses the device's native sharing feature where supported; otherwise save the PNG and share it manually.
- These features are generated locally in the browser and do not upload your data.

BIRTHDAY WISHES STORAGE
-----------------------
The 12 curated wishes are built into wishes.html. Any future browser-based saved notes (such as the future note) stay on that one device/browser. They do not sync between visitors without a server/database.

TROUBLESHOOTING
---------------
- Broken photo/music: check spelling, extension, and that the asset is beside the HTML files.
- Navigation error: keep all HTML pages in this same folder.
- No music: press Play and confirm birthday-music.mp3 exists in the folder.
- Images load slowly: resize them or use optimized JPG/WEBP files and update the filenames in HTML/JS.
- For hosting, upload the entire folder while preserving the filenames and relative paths.

CREATOR CREDIT
--------------
Every page credits: “Made by Subhajit Das with love for Rohan Palui. ❤️”
