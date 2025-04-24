# Translation Guide

We take English as the target language for this example:


## Opening the Source Code with VS Code

> VS Code Official Website: https://code.visualstudio.com/
>
> WebStorm Official Website: https://www.jetbrains.com/webstorm/

VS Code is an open-source and free code editor, widely used. You can also use WebStorm for translation.

### VS Code vs WebStorm

- VS Code is open-source and free, requiring manual plugin configuration.
- WebStorm, as of October 24, 2024, allows non-commercial use and is ready to use out of the box.



 ### Running the Project

```powershell
pnpm install
pnpm dev
```

> Install pnpm via npm: Ensure npm is installed, then run `npm install -g pnpm` in the terminal to install pnpm globally.
>
> npm Download: Node.js includes npm: https://nodejs.org/en

The project will start:

```powershell
  VITE v6.2.2  ready in 2887 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.0.106:5173/
  ➜  Vue DevTools: Open http://localhost:5173/__devtools__/ as a separate window
  ➜  Vue DevTools: Press Alt(⌥)+Shift(⇧)+D in App to toggle the Vue DevTools
  ➜  press h + enter to show help
```

If you forget the address during modifications, simply type `u` and press Enter in the terminal to retrieve the address again.

## Copying the Folder

Copy the `src/i18n/locales/zh` folder and paste it as the abbreviation for your target language. Since my target language is English, I paste it as `en`:

![image-20250419184144583](./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419184144583.png)

`src/i18n/index.ts` 添加两行代码:

```js
// Import Chinese translation
import zhMessage from './locales/zh' // ./locales/zh/index.ts
// Import English translation
import enMessage from './locales/en' // Added code

// Merge module to language object
const messages = {
    zh: zhMessage, // Chinese
    en: enMessage, // Added code
};
```

## Adding Language Switching Option

In `src/i18n/constants/index.ts`, add:

```js
import type {ActionSheetEntry} from "@/components/CornActionSheet/CornActionSheet.type.ts";

export const languageActionSheet: ActionSheetEntry[] = [
    {showText: '中文', value: 'zh'},// Copy and paste
    {showText: 'English', value: 'en'}, // Added
]

```

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419155242857.png" alt="image-20250419155242857" style="zoom: 33%;" />

Language switching is now supported:

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419155432992.png" alt="image-20250419155432992" style="zoom:33%;" />

## Start Translating!

Once switched, you can begin translating. Make slight modifications to test if the translation is applied successfully in `src/i18n/locales/[language_folder]/app-store.ts`:

```js
// for app.store.js

export default {
    logTitle: 'Log',
    drugTitle: '药律',
    loveTitle: '善举',
    treatmentTitle: '戒律',
}

```

After modifying, check the browser to see if the changes are reflected:

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419194136776.png" alt="image-20250419194136776" style="zoom:50%;" />

### Acknowledgments and Tips

Thank you so much for translating this software—it’s the greatest recognition for me! However, translation can be tedious and labor-intensive. I recommend using AI tools like Doubao or GPT by pasting the file content for translation.

### File Overview

```text
.
|-- app-store.ts // App-related
|-- calc.ts // Calendar page
|-- config.ts // Settings page
|-- corn-cell-enum-number.ts
|-- corn-date-select-button.ts
|-- corn-log-form-popup.ts
|-- corn-log.ts
|-- default-entry.ts
|-- enable.ts
|-- index-base.ts // Homepage
|-- index.ts // No modification needed
|-- list.ts // Homepage list-related
|-- lock.ts // Privacy page
|-- search.ts // Search page
|-- tab-bar.ts // Bottom tab bar
|-- time.ts
`-- wallpaper.ts // Wallpaper settings

0 directories, 17 files
```

### app-store.ts

Homepage titles:
<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419201142648.png" alt="image-20250419201142648" style="zoom:50%;" />

Settings page options:
<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419201252179.png" alt="image-20250419201252179" style="zoom:50%;" />

### tab-bar.ts

Bottom Tab Bar:

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419202035575.png" alt="image-20250419202035575" style="zoom: 50%;" />



### calc.ts

Calendar page:

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419201528700.png" alt="image-20250419201528700" style="zoom:50%;" />

### search.ts

Search page:
![image-20250419202247391](./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419202247391.png)

### index-base.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419202725510.png" alt="image-20250419202725510" style="zoom:50%;" />

![image-20250419202626678](./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419202626678.png)

### default-entry

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419203042174.png" alt="image-20250419203042174" style="zoom:50%;" />

### corn-log-form-popup.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419203232715.png" alt="image-20250419203232715" style="zoom:50%;" /> 

### corn-date-select-button.ts

![image-20250419211440451](./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419211440451.png)

### corn-log.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419203452422.png" alt="image-20250419203452422" style="zoom:50%;" />

## list.ts

Homepage list:

![image-20250419203830683](./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419203830683.png)

### Config.ts

Settings page:

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419210101944.png" alt="image-20250419210101944" style="zoom:50%;" />

### enable.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419210714559.png" alt="image-20250419210714559" style="zoom: 50%;" />

### wallpaper.ts

![image-20250419211013816](./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419211013816.png)



###  corn-cell-enum-number.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419211705141.png" alt="image-20250419211705141" style="zoom:33%;" />



### lock.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419212128778.png" alt="image-20250419212128778" style="zoom:33%;" />

### treatment-view.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419234156588.png" alt="image-20250419234156588" style="zoom:50%;" />

### statistics-displayer.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419234303599.png" alt="image-20250419234303599" style="zoom:50%;" />

## love-view.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419234409241.png" alt="image-20250419234409241" style="zoom:50%;" />

### fab.ts

<img src="./img/%E7%BF%BB%E8%AF%91%E6%8C%87%E5%8D%97/image-20250419234520534.png" alt="image-20250419234520534" style="zoom:50%;" />

## Contact Me

If you encounter any issues, feel free to reach out!

My QQ is 2402398917—welcome to chat!

I don’t have international social media accounts. If you’re an international friend, you can communicate with me via GitHub repository issues!
