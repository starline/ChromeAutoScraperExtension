document.getElementById('copy').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id || !tab.url) {
        alert('❌ Не удалось определить активную вкладку.');
        return;
    }

    if (!/^https?:/i.test(tab.url)) {
        alert('❌ Расширение не работает на системных страницах браузера.');
        return;
    }

    const isSupported =
        /(?:^|\.)iaai\.com$/i.test(new URL(tab.url).hostname) ||
        /(?:^|\.)copart\.com$/i.test(new URL(tab.url).hostname);

    if (!isSupported) {
        alert('❌ Откройте лот на iaai.com или copart.com.');
        return;
    }

    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content/content.js'],
        });
    } catch (error) {
        alert('❌ Не удалось запустить парсер на этой странице.');
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'copyData') {
        navigator.clipboard.writeText(message.text).then(() => {
            alert('✅ Данные скопированы:\n' + message.text);
        }).catch(() => {
            alert('❌ Не удалось скопировать данные в буфер обмена.');
        });
        return;
    }

    if (message.action === 'copyError') {
        alert('❌ ' + message.text);
    }
});
