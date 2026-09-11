export default function parseCopart() {
    const title =
        getText('h1.ldp-header-title') ||
        getText('h1.title');

    const engine =
        getValueByLabel('Engine type:') ||
        getText('span[data-uname="lotdetailEnginetype"]');

    const name = engine ? `${title} - ${engine}` : title;

    const rawMileage =
        getValueByLabel('Odometer:') ||
        getText('span[data-uname="lotdetailOdometervalue"]');
    const mileageMatch = rawMileage.match(/[\d,]+/);
    const mileage = mileageMatch ? mileageMatch[0].replace(/,/g, '') : '';

    const rawState =
        getValueByLabel('Title code:') ||
        getText('span[data-uname="lotdetailTitledescriptionvalue"]');
    const state = rawState.split('-')[0].trim();

    return { name, mileage, state };
}

function getText(selector) {
    const el = document.querySelector(selector);
    return el ? normalizeText(el.textContent) : '';
}

function getValueByLabel(labelText) {
    const labels = document.querySelectorAll('label.lot-details-information-label');
    for (const label of labels) {
        if (normalizeText(label.textContent) !== labelText) {
            continue;
        }

        const row = label.closest('.lot-details-information') || label.parentElement;
        const valueEl = row?.querySelector('.lot-details-information-value');
        return valueEl ? normalizeText(valueEl.textContent) : '';
    }

    return '';
}

function normalizeText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
}
