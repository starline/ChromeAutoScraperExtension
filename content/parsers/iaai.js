export default function parseIaai() {
    const title = getText('h1.heading-2');
    const engine = getDataListValue('Engine:');
    const name = engine ? `${title} - ${engine}` : title;
    const mileage = getOdometerValueFromList();
    const state = getStateFromSellingBranch();

    return { name, mileage, state };
}

function getText(selector) {
    const el = document.querySelector(selector);
    return el ? el.textContent.trim() : '';
}

function getDataListValue(labelText) {
    const items = document.querySelectorAll('li.data-list__item');
    for (const item of items) {
        const label = item.querySelector('.data-list__label')?.textContent.trim();
        if (label === labelText) {
            return item.querySelector('.data-list__value')?.textContent.trim() || '';
        }
    }
    return '';
}

function getOdometerValueFromList() {
    const value = getDataListValue('Odometer:');
    const match = value.match(/[\d,]+/);
    if (match) {
        return match[0].replace(/,/g, '');
    }
    return '';
}

function getStateFromSellingBranch() {
    const value =
        getDataListValue('Selling Branch:') ||
        getDataListValue('Branch:');
    const match = value.match(/\(([^)]+)\)/);
    return match ? match[1] : '';
}
